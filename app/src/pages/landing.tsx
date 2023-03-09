import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";
import { UserData, type UserDataType} from "../../utils/types";
import { z } from "zod";

export default function LandingPage({ user }: { user: UserDataType }) {
    return (
        <div className="flex flex-col min-h-screen max-h-screen">
            <div className="flex flex-row flex-1">
                <Sidebar />
                <Landing user={user} />
            </div>
            <Controlbar />
        </div>
    );
}

