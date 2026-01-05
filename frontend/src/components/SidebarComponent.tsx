import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import {
  Settings,
  Home,
  Dumbbell,
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"
import { useTheme } from "@/contexts/ThemeContext"

export function SidebarComponent() {
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()

  return (
    <Sidebar side="left" collapsible="icon">
      <SidebarHeader
        className="
          bg-sidebar-DEFAULT text-sidebar-foreground
          px-4 py-2 border-b
          flex items-center gap-2
          group-data-[collapsible=icon]:justify-center
          group-data-[collapsible=icon]:px-0
        "
      >
        <h2
          className="
            text-sm font-semibold transition-all
            group-data-[collapsible=icon]:opacity-0
            group-data-[collapsible=icon]:w-0
            group-data-[collapsible=icon]:overflow-hidden
          "
        >
          Moddy
        </h2>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="bg-sidebar-DEFAULT text-sidebar-foreground">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem className="mb-5">
                <Link to="/">
                  <SidebarMenuButton isActive={pathname === "/"}>
                    <Home className="h-5 w-5" />
                    <span>Página Inicial</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

          <SidebarGroupLabel>Rotina</SidebarGroupLabel>
              <SidebarMenuItem>
                <Link to="/drilling">
                  <SidebarMenuButton isActive={pathname === "/drilling"}>
                    <Dumbbell className="h-5 w-5" />
                    <span>Treinos</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t bg-sidebar-DEFAULT text-sidebar-foreground">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent side="top" align="start">
                <DropdownMenuItem onClick={toggleTheme}>
                  Mudar tema ({theme === "light" ? "Escuro" : "Claro"})
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/users/me">
                    Configurações de usuário
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
