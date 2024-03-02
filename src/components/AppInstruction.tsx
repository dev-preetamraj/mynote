import { forwardRef } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

const AppInstruction = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Instruction</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96 z-50">
              <ListItem title="Browser Refresh">
                Refreshing browser clears the canvas but the last saved history
                will be restored from local storage.
              </ListItem>
              <ListItem title="Viewport Change">
                Changing Viewport clears the canvas but the last saved history
                will be restored from local storage.
              </ListItem>
              <ListItem title="Coming soon for Mobile and Tab">
                Currently, canvas listens to only mouse events. Touch events
                will be included soon.
              </ListItem>
              <ListItem
                title="Contribute to this project"
                href="https://github.com/dev-preetamraj/mynote"
                target="_blank"
                className="cursor-pointer"
              >
                Click here to visit github repository.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default AppInstruction;
