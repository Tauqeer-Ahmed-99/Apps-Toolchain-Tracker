import { NextRequest, NextResponse } from "next/server";
import { APIResponse, APIStatus, Application } from "@/lib/models";
import { hasAppPermissions } from "@/lib/permissions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserApps, searchUserApps } from "@/database/actions/getApps";

export const GET = async (
  _req: NextRequest,
  { params }: { params: Promise<{ searchTerm: string }> }
) => {
  try {
    const isPermitted = await hasAppPermissions();

    if (!isPermitted) {
      return NextResponse.json(
        {
          status: APIStatus.Error,
          message: "Permission Not Allowed.",
        } as APIResponse,
        { status: 403 }
      );
    }

    const searchTerm = (await params).searchTerm;

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    let apps: Application[];

    if (searchTerm.toLowerCase() === "all") {
      apps = await getUserApps(user.id);
    } else {
      apps = await searchUserApps(user.id, searchTerm);
    }

    return NextResponse.json(
      {
        status: APIStatus.Success,
        message: `${apps.length} apps found.`,
        data: apps,
      } as APIResponse<Application[]>,
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: APIStatus.Error,
        message: (error as Error).message,
      } as APIResponse,
      { status: 500 }
    );
  }
};
