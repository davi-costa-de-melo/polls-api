export function formatVotesResult(result: string[]) {
  return result.reduce(
    (accumulator, current, index, source) => {
      if (index % 2 !== 0) {
        const optionId = source[index - 1]
        return { ...accumulator, [optionId]: Number(current) }
      }

      return accumulator
    },
    {} as Record<string, number>,
  )
}
