/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { ComponentPropsWithoutRef, PropsWithChildren, useState } from "react";

type ShiftingGridProps = PropsWithChildren<{
  columns: number;
}>;

export function ShiftingGrid({ columns, children }: ShiftingGridProps) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(${columns}, 1fr);
        grid-auto-rows: 1fr;
        border: 1px solid black;
      `}
    >
      {children}
    </div>
  );
}

type BaseShiftingTileProps = ComponentPropsWithoutRef<"div"> & {
  shiftTo?: [number, number];
};

type DumbShiftingTileProps = BaseShiftingTileProps & {
  shifted?: boolean;
};

type SimpleShiftingTileProps = BaseShiftingTileProps & {
  onShiftToggle?: (shifted: boolean) => boolean | void;
  defaultShifted?: boolean;
};

export function DumbShiftingTile({
  shiftTo = [1, 1],
  shifted = false,
  children,
  ...restProps
}: DumbShiftingTileProps) {
  const [colShift, rowShift] = shiftTo;
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f1f5f9;
        margin: 8px;
        border-radius: 10px;
        cursor: pointer;
        font-size: 2.75rem;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        user-select: none;
        min-height: 20vw;
        color: #ef4444;
        ${shifted && { background: "#e2e8f0", color: "#84cc16" }}
        ${shifted && colShift > 1 && { gridColumn: `span ${colShift}` }}
        ${shifted && rowShift > 1 && { gridRow: `span ${rowShift}` }}
      `}
      {...restProps}
    >
      {children}
    </div>
  );
}

export function SimpleShiftingTile({
  onShiftToggle = () => true,
  defaultShifted = false,
  ...restProps
}: SimpleShiftingTileProps) {
  const [shifted, setShifted] = useState<boolean>(defaultShifted);
  const toggleShift = () => {
    const newState = !shifted;
    const acceptChange = onShiftToggle(newState);
    if (acceptChange === undefined || acceptChange) {
      setShifted(newState);
    }
  };

  return (
    <DumbShiftingTile
      onClick={(e) => toggleShift()}
      shifted={shifted}
      {...restProps}
    />
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>Testing grid stuff</h1>
      <ShiftingGrid columns={4}>
        <SimpleShiftingTile shiftTo={[1, 2]}>1</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[2, 1]}>2</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[2, 2]}>3</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[1, 1]}>4</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[1, 1]}>5</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[2, 2]}>6</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[2, 1]}>7</SimpleShiftingTile>
        <SimpleShiftingTile>8</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[3, 1]}>9</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[3, 3]}>10</SimpleShiftingTile>
        <SimpleShiftingTile>11</SimpleShiftingTile>
        <SimpleShiftingTile shiftTo={[4, 4]}>12</SimpleShiftingTile>
      </ShiftingGrid>
    </div>
  );
}
