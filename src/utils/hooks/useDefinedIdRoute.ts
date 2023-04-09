import { useRouter } from "next/router";

export function useDefinedIdRoute():
  | {
      loading: true;
      id: undefined;
    }
  | {
      loading: false;
      id: string;
    } {
  const router = useRouter();
  const { id } = router.query;

  if (!router.isReady) {
    return { loading: true, id: undefined };
  }

  if (!id) {
    throw new Error("Id not passed correctly");
  }

  if (Array.isArray(id)) {
    throw new Error("Nested query not implemented for this route");
  }

  return { loading: false, id };
}
