"use client";

import { Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ROUTES } from "../constants/routes";
import { CuteButton } from "./cuteButton";
import { DefaultProfile } from "./defaultProfile";
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeMode } from "../app/themeContext";
import { NotifyModal } from "./notifyModal";
import { Card } from "./card";
import Link from "next/link";


interface IMenu {
    op1: string,
    op2: string,
    op3: string,
    op4: string,
    manager?: boolean,
    admin?: boolean
}

export const Menu = ({ op1, op2, op3, op4, manager, admin } : IMenu) => {
    const [isOpen, setIsOpen] = useState(false);
    const { mode, toggleMode } = useThemeMode();
    const [notifyOpen, setNotifyOpen] = useState(false);

    const router = useRouter();

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const getNotify = () => {
        setNotifyOpen(true);
    }

    const DrawerListStudent = (
        <div onClick={toggleDrawer(false)} className="flex flex-col bg-(--darkBlue) h-screen">
            <Link href={ROUTES.home} className="w-full flex justify-center">
                <h1 className="text-3xl font-semibold m-0 self-center text-(--aquamarine) my-2.5" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
            </Link>
            <List sx={{ backgroundColor: "inherit", width: "240px" }}>
                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                            <DashboardOutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.home)} className="text-white font-bold" primary={op1}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                            <LibraryBooksOutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.courses)} className="text-white font-bold" primary={op2}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                            <CalendarMonthOutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.calendar)} className="text-white font-bold" primary={op3}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                            <Person2OutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.profile)} className="text-white font-bold" primary={op4}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
        );

        const DrawerListManager = (
            <div onClick={toggleDrawer(false)} className="flex flex-col bg-(--darkBlue) h-screen">
                <Link href={ROUTES.homeManager} className="w-full flex justify-center">
                    <h1 className="text-3xl font-semibold m-0 self-center text-(--aquamarine) my-2.5" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                </Link>
                <List sx={{ backgroundColor: "inherit", width: "240px" }}>
                    <ListItem sx={{padding: "0px"}}>
                        <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                            <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                                <DashboardOutlinedIcon sx={{ color: "white" }}/>
                                <ListItemText onClick={() => router.push(ROUTES.homeManager)} className="text-white font-bold" primary={op1}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem sx={{padding: "0px"}}>
                        <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                            <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                                <LibraryBooksOutlinedIcon sx={{ color: "white" }}/>
                                <ListItemText onClick={() => router.push(ROUTES.coursesManager)} className="text-white font-bold" primary={op2}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem sx={{padding: "0px"}}>
                        <ListItemButton sx={{padding: "8px", paddingX: "10px"}}>
                            <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                                <GroupsOutlinedIcon sx={{ color: "white" }}/>
                                <ListItemText onClick={() => router.push(ROUTES.collaborators)} className="text-white font-bold" primary={"Colaboradores"}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem sx={{padding: "0px"}}>
                        <ListItemButton sx={{padding: "8px", paddingX: "10px"}}>
                            <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                                <Person2OutlinedIcon sx={{ color: "white" }}/>
                                <ListItemText onClick={() => router.push(ROUTES.profileManager)} className="text-white font-bold" primary={op4}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        );

        const DrawerListAdmin = (
            <div onClick={toggleDrawer(false)} className="flex flex-col bg-(--darkBlue) h-screen">
                <Link href={ROUTES.homeAdmin} className="w-full flex justify-center">
                    <h1 className="text-3xl font-semibold m-0 self-center text-(--aquamarine) my-2.5" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                </Link>
                
                <List sx={{ backgroundColor: "inherit", width: "240px" }}>
                    <ListItem sx={{padding: "0px"}}>
                        <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                            <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                                <DashboardOutlinedIcon sx={{ color: "white" }}/>
                                <ListItemText onClick={() => router.push(ROUTES.homeAdmin)} className="text-white font-bold" primary={op1}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>

                    <ListItem sx={{padding: "0px"}}>
                        <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                            <ListItemIcon className="w-full transform transition-all duration-150 rounded px-3 py-1 gap-4 items-center flex">
                                <LibraryBooksOutlinedIcon sx={{ color: "white" }}/>
                                <ListItemText onClick={() => router.push(ROUTES.coursesAdmin)} className="text-white font-bold" primary={op2}/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        );

        return (
        <>
            <div className="bg-(--card) border-b border-(--stroke) fixed w-screen h-14 z-50 shadow-(--shadow) items-center flex justify-between px-5">
                <div className="flex items-center gap-3">
                    <Button sx={{ color: "var(--gray)", padding: "0px", width: "30px", minWidth: "0px" }} onClick={toggleDrawer(true)}>
                        <MenuOutlinedIcon sx={{ width: "30px" }}/>
                    </Button>
                    {manager ? (
                        <Link href={ROUTES.homeManager}>
                            <h1 className="text-2xl font-semibold m-0 text-(--text)" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                        </Link>
                    ) : admin ? (
                        <Link href={ROUTES.homeAdmin}>
                            <h1 className="text-2xl font-semibold m-0 text-(--text)" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                        </Link>
                    ) : (
                        <Link href={ROUTES.home}>
                            <h1 className="text-2xl font-semibold m-0 text-(--text)" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                        </Link>
                    )}
                </div>
                <div className="flex gap-3 items-center">
                    <CuteButton icon={NotificationsNoneOutlinedIcon} onClick={getNotify}></CuteButton>
                    <DefaultProfile firstLetter="S" lastLetter="S" onClick={() => router.push(ROUTES.profile)}></DefaultProfile>
                </div>
            </div>
            <Drawer open={isOpen} onClose={toggleDrawer(false)}>

                {manager ? (
                    <>
                        {DrawerListManager}
                    </>
                ) : admin ? (
                    <>
                        {DrawerListAdmin}
                    </>
                ) : (
                    <>
                        {DrawerListStudent}
                    </>
                )}
                
                <div className="bg-(--darkBlue) flex justify-between p-3">
                    <Button onClick={toggleMode}>
                        {mode === "dark" ? (
                            <LightModeIcon sx={{ color: "white" }} />
                        ) : (
                            <DarkModeIcon sx={{ color: "white" }} />
                        )}
                    </Button>
                    <Button onClick={() => router.push(ROUTES.login)}>
                        <LogoutIcon sx={{ color: "white" }}/>
                    </Button>
                </div>
            </Drawer>

            <NotifyModal title="Notificações" open={notifyOpen} onClose={() => setNotifyOpen(false)}>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
                <Card title="Curso" description="Você foi adicionado em um novo curso!" color="bg-[var(--purple)]"></Card>
            </NotifyModal>

            <div className="h-14"></div>
        </>
    );
}