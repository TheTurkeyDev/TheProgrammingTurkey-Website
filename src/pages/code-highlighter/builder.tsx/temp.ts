export const code: readonly string[] = `func (b *Board) GenerateOptions() {
  for r := 0; r < 9; r++ {
    for c := 0; c < 9; c++ {
      if b.board[r][c] != 0 {
        b.options[r][c] = []int{}
        continue
      } else {
        b.options[r][c] = []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
      }

      for i := 0; i < 9; i++ {
        if i != r {
          b.options[r][c] = RemoveValue(b.options[r][c], b.board[i][c])
        }
        if i != c {
          b.options[r][c] = RemoveValue(b.options[r][c], b.board[r][i])
        }
      }
      innerIndex := ((r % 3) * 3) + (c % 3)

      for i := 0; i < 9; i++ {
        if i == innerIndex {
          continue
        }
        adjRow := ((r / 3) * 3) + (i / 3)
        adjColumn := ((c / 3) * 3) + (i % 3)
        b.options[r][c] = RemoveValue(b.options[r][c], b.board[adjRow][adjColumn])
      }
    }
  }
}
`.split('\n');

export const lines: readonly number[] = [2, 4];