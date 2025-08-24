import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { shopHeaderMenuItems } from "@/config";
import { useLogoutUser } from "../../hooks/useLogout";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function MenuItems() {
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shopHeaderMenuItems.map((menuItem) => (
        <Link
          to={menuItem.path}
          key={menuItem.id}
          className="text-sm font-medium"
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const handleLogout = useLogoutUser();

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User cart</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursior-pointer">
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as {user?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 mt-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShopHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs">
            <SheetHeader>
              <SheetTitle />
            </SheetHeader>

            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}

export default ShopHeader;
