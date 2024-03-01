'use client';

import { store } from "@/features/store";
import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";

const Provider = ({ children }: PropsWithChildren) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};

export default Provider;
