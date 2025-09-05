import { Button } from "@/components/ui/button";
import { signOut } from "@/auth";
import ApiCall from "@/components/apicall";

const Dash = () => {
  return (
    <div>
      Hello Ji
      <Button
        variant="destructive"
        onClick={async () => {
          "use server";
          await signOut();
        }}
      >
        SignOut{" "}
      </Button>
      <ApiCall/>
    </div>
  );
};

export default Dash;
