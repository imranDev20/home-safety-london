"use client";
import { createSvgIcon } from "@mui/joy/utils";
import GasSafteySvg from "../../../images/icons/gas-safety.svg";
import PatSvg from "../../../images/icons/pat-icon.svg";
import EicrSvg from "../../../images/icons/eicr-icon.svg";
import EpcSvg from "../../../images/icons/epc-icon.svg";
import FireSvg from "../../../images/icons/fire-icon.svg";
import FireRiskSvg from "../../../images/icons/fire-risk.svg";
import PlumbingSvg from "../../../images/icons/plumbing-icon.svg";

export const GasSafteyIcon = createSvgIcon(<GasSafteySvg />, "Gas");
export const PatIcon = createSvgIcon(<PatSvg />, "Pat");
export const EicrIcon = createSvgIcon(<EicrSvg />, "Eicr");
export const EpcIcon = createSvgIcon(<EpcSvg />, "Epc");
export const FireIcon = createSvgIcon(<FireSvg />, "Fire");
export const FireRiskIcon = createSvgIcon(<FireRiskSvg />, "FireRisk");
export const PlumbingIcon = createSvgIcon(<PlumbingSvg />, "FireRisk");
