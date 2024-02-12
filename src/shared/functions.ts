export function snakeCaseToNormalText(snakeCaseString: string) {
  return snakeCaseString.replace(/_/g, " ").toLowerCase();
}
