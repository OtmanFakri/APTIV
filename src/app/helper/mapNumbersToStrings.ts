export function mapNumbersToStrings(numbers: number[]): string[] {
  const mapping: { [key: number]: string } = {
    1: "DH",
    2: "IS",
    3: "IH"
  };

  return numbers.map(num => mapping[num] || "Unknown");
}
