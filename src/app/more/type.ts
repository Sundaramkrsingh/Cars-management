import { Options } from "nuqs"

export type PageProps = {
  setEdit: <Shallow>(
    value: string | ((old: string | null) => string | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
  loading?: boolean
}
