export type Options = "A" | "B" | "C" | "D"

export type Validity = "correct" | "wrong" | "default"

export type OptionCatagories = "partial" | "full"

export type Answer = {
  selectedOption?: { label: string; value: string }
  optionValue?: Options
}
