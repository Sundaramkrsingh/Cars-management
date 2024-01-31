import { Foresight, PowerUps, WildCards } from "./components";

export default async function Chat() {
  return (
    <div className="relative p-5 bg-foreground rounded-b-2xl rounded-e-2xl overflow-hidden flex flex-col gap-7">
      <div className="border-gradient top-0 left-0 absolute" />
      <Foresight />
      <PowerUps />
      <WildCards />
    </div>
  );
}
