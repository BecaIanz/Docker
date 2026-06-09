import { Box, type BoxComponentProps } from "@mantine/core";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router";

export interface IAppLinkProps extends LinkProps, Omit<BoxComponentProps, keyof LinkProps> 
{ 
    type?: "block" | "inline";
}

export const AppLink = forwardRef<HTMLAnchorElement, IAppLinkProps>(
    ({ type = "block", ...props }, ref) => (
        <Box 
            ref={ref}
            component={Link} 
            display={type}
            td="none"
            {...props} 
        />
    )
)