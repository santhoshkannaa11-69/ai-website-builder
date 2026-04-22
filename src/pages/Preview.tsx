import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Loader2Icon } from "lucide-react";
import ProjectPreview from "../components/ProjectPreview";
import type { Project, Version } from "../types";
import api from "@/configs/axios";
import { toast } from "sooner"
import { authClient } from "@/lib/auth-client";


const Preview = () => {

    const {data: session, isPending} = authClient.useSession()
    const { projectID, versionID } = useParams()
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchCode = async () => {
    try {
        const { data } = await api.get(`/api/project/preview/${projectID}`)
        setCode(data.project.current_code)
        if(versionID){
            data.project.versions.forEach((version: Version)=>{
                if(version.id === versionID){
                    setCode(version.code)
                }
            })
        } 
        setLoading(false)
    } catch (error: any) {
        toast.error(error?.response?.data?.message || error.message);
        console.log(error);
         
    }
    }

    useEffect(()=> {
        if(!isPending && session?.user){
            fetchCode()
        }
    },[session?.user])

    if(loading){
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2Icon className="size-7 animate-spin text-indigo-200" />
            </div>
        )
    }

    if(!code){
        return (
            <div className="flex items-center justify-center h-screen text-white">
                Preview could not be loaded.
            </div>
        )
    }

    return (
        <div className="h-screen">
            <ProjectPreview project={{current_code: code} as Project} isGenerating={false} showEditorPanel={false} />
        </div>
    )
}

export default Preview
