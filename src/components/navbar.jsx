import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../../lib/utils";
import ToggleTheme from "../ThemeContext/ToggleTheme";
import { useSelector } from "react-redux";

export function NavbarDemo() {
  
  return (
    <div className="relative mb-24 w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  
  const user = useSelector((state) => state.role)!=='null';
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/shop/billing">Generate Bill</HoveredLink>
            <HoveredLink to="/shop/verify">Verify Shop Accounts</HoveredLink>
            <HoveredLink to="/shop/bill-history">Check Billing History</HoveredLink>
            <HoveredLink to="/shop/cities">Add Cities</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Products">
          <div className="  text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Algochurn"
              to="https://algochurn.com"
              src="https://assets.aceternity.com/demos/algochurn.webp"
              description="Prepare for tech interviews like never before."
            />
            <ProductItem
              title="Tailwind Master Kit"
              to="https://tailwindmasterkit.com"
              src="https://assets.aceternity.com/demos/tailwindmasterkit.webp"
              description="Production ready Tailwind css components for your next project"
            />
            <ProductItem
              title="Moonbeam"
              to="https://gomoonbeam.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.51.31%E2%80%AFPM.png"
              description="Never write from scratch again. Go from idea to blog in minutes."
            />
            <ProductItem
              title="Rogue"
              to="https://userogue.com"
              src="https://assets.aceternity.com/demos/Screenshot+2024-02-21+at+11.47.07%E2%80%AFPM.png"
              description="Respond to government RFPs, RFIs and RFQs 10x faster using AI"
            />
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Pricing">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink to="/hobby">Hobby</HoveredLink>
            <HoveredLink to="/individual">Individual</HoveredLink>
            <HoveredLink to="/team">Team</HoveredLink>
            <HoveredLink to="/enterprise">Enterprise</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Theme">
          <ToggleTheme />
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Profile">
          {user?<>
          <HoveredLink to="/logout">Logout</HoveredLink>
          </>:<>
          <HoveredLink to="/login">Login</HoveredLink>
          </>}
        </MenuItem>
      </Menu>
    </div>
  );
}
