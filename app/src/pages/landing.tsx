import Controlbar from "../components/Controlbar";
import Sidebar from "../components/Sidebar";
import Landing from "../components/Landing";

export default function LandingPage({ 
  userInfo 
}: { 
  userInfo: String 
}) {
    return (
        <div className="flex flex-col min-h-screen max-h-screen">
            <div className="flex flex-row flex-1">
                <Sidebar />
                <Landing />
            </div>
            <Controlbar />
        </div>
    );
}

