"use client";
import { createSvgIcon } from "@mui/joy/utils";
import GasSafteySvg from "@/images/icons/gas-safety.svg";
import PatSvg from "@/images/icons/pat-icon.svg";
import EicrSvg from "@/images/icons/eicr-icon.svg";
import EpcSvg from "@/images/icons/epc-icon.svg";
import FireSvg from "@/images/icons/fire-icon.svg";
import FireRiskSvg from "@/images/icons/fire-risk.svg";
import PlumbingSvg from "@/images/icons/plumbing-icon.svg";
import BoilerSvg from "@/images/icons/boiler-icon.svg";
import FireAlarmSvg from "@/images/icons/fire-alarm-icon.svg";
import FuseBoxSvg from "@/images/icons/fuse-box-icon.svg";
import ElectricalRepairSvg from "@/images/icons/electrical-repair-icon.svg";
import FireAlarmInstallSvg from "@/images/icons/fire-alarm-install-icon.svg";
import EngineersSvg from "@/images/icons/engineer.svg";

export const GasSafteyIcon = createSvgIcon(<GasSafteySvg />, "Gas");
export const PatIcon = createSvgIcon(<PatSvg />, "Pat");
export const EicrIcon = createSvgIcon(<EicrSvg />, "Eicr");
export const EpcIcon = createSvgIcon(<EpcSvg />, "Epc");
export const FireIcon = createSvgIcon(<FireSvg />, "Fire");
export const FireRiskIcon = createSvgIcon(<FireRiskSvg />, "FireRisk");
export const PlumbingIcon = createSvgIcon(<PlumbingSvg />, "FireRisk");
export const BoilerIcon = createSvgIcon(<BoilerSvg />, "Boiler");
export const FireAlarmCertificateIcon = createSvgIcon(
  <FireAlarmSvg />,
  "FireAlarm"
);

export const FuseBoxIcon = createSvgIcon(<FuseBoxSvg />, "FuseBox");
export const ElectricalRepairIcon = createSvgIcon(
  <ElectricalRepairSvg />,
  "ElectricalRepairs"
);
export const FireAlarmInstallIcon = createSvgIcon(
  <FireAlarmInstallSvg />,
  "FireAlarmInstall"
);

export const EngineersIcon = createSvgIcon(<EngineersSvg />, "Engineers");
