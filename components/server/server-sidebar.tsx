import { CurrentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

interface ServerSidebarProps{
    serverId: string;
}

export const ServerSidebar = async({
    serverId
}:ServerSidebarProps)=>{

    const profile = await CurrentProfile();
    if(!profile){
        return redirect("/")
    }

    const server = await db.server.findUnique({
        where:{
            id: serverId
        },
        include:{
            channels:{
                orderBy:{
                    createdAt:'asc'
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:'asc'
                }
            }
        }
    })

    const textChannels = server?.channels.filter((channel)=> channel.type===ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel)=> channel.type===ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel)=> channel.type===ChannelType.VIDEO)

    const members = server?.members.filter((member)=> member.profileId !== profile.id)

    if(!server){
        return redirect("/");
    }

    const role = server.members.find((member)=> member.profileId === profile.id)?.role

    return(
        <div className="flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#f2f3f5]">
            <ServerHeader
                server={server}
                role={role}
            />
            <ScrollArea className="flex-1 px-3">
                <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-1 h-1 w-full"/>
                {!!textChannels?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.TEXT}
                            role={role}
                            label="Text Channels"
                        />
                        {textChannels.map((channel)=>(
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server} 
                            />
                        ))}
                    </div>
                )}
                {!!audioChannels?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.AUDIO}
                            role={role}
                            label="Voice Channels"
                        />
                        {audioChannels.map((channel)=>(
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server} 
                            />
                        ))}
                    </div>
                )}
                {!!videoChannels?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="channels"
                            channelType={ChannelType.VIDEO}
                            role={role}
                            label="Video Channels"
                        />
                        {videoChannels.map((channel)=>(
                            <ServerChannel
                                key={channel.id}
                                channel={channel}
                                role={role}
                                server={server} 
                            />
                        ))}
                    </div>
                )}
                {!!members?.length && (
                    <div className="mb-2">
                        <ServerSection 
                            sectionType="members"
                            server={server}
                            role={role}
                            label="Members"
                        />
                        {members.map((member)=>(
                            <ServerMember
                                key={member.id}
                                member={member}
                                server={server}
                            />
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>
    )
}