export const puzzles = [
    {
      id: 'cipher',
      type: 'cipher',
      title: 'Шифр Цезаря',
      description: 'Расшифруйте закодированное сообщение:',
      encryptedText: 'ЗХСЛУ',
      cipherShift: 3,
      difficulty: 3,
      preview: '🕵️‍♂️🔠',
      theme: 'linear-gradient(135deg, #00ADB5 0%, #006B72 100%)',
      hint: 'Каждая буква сдвинута на 3 позиции вперед в русском алфавите',
      solved: 245,
      rules: {
        maxAttempts: 5,
        timeLimit: 300
      }
    },
    {
      id: 'sudoku',
      type: 'sudoku',
      title: 'Мини-Судоку 4x4',
      description: 'Заполните пропущенные числа:',
      initialGrid: [
        [1, null, null, 2],
        [null, 3, 4, null],
        [null, 1, 2, null],
        [4, null, null, 3]
      ],
      solution: [[1,4,3,2],[2,3,4,1],[3,1,2,4],[4,2,1,3]],
      difficulty: 4,
      preview: '🔢🧩',
      theme: 'linear-gradient(135deg, #F59E0B 0%, #B45309 100%)',
      hint: 'Числа от 1 до 4 не должны повторяться в строках и столбцах',
      solved: 182,
      rules: {
        maxHints: 3,
        penaltyPerHint: 60
      }
    }
  ];