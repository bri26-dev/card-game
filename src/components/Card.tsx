type Props = {
  name: string;
  cost: number;
  power: number;
  selected?: boolean;

  onClick?: () => void;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchMove?: (e: React.TouchEvent) => void;
  onTouchEnd?: () => void;
};

export default function Card({
  name,
  cost,
  power,
  selected,
  onClick,
  onTouchStart,
  onTouchMove,
  onTouchEnd,
}: Props) {
  return (
    <div
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={`
        w-16 h-24 rounded-md border 
        flex flex-col justify-between p-1
        transition
        ${selected ? "border-black scale-105 bg-gray-100" : "border-black bg-white"}
      `}
    >
      <div className="text-xs">{cost}</div>
      <div className="text-[10px] text-center">{name}</div>
      <div className="text-xs text-right">{power}</div>
    </div>
  );
}
