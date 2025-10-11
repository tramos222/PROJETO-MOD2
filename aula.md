ALUNO
RA(PK)
Nome
CPF

MATRICULA
Cod(PK)
RA(FK)
CodCurso(FK)

CURSO
CodCurso(PK)
NomeCurso
Turno

PROFESSOR
CodProf(PK)
Turma
Nome

DISCIPLINA
CodCurso(FK)

Aluno (1) realiza Matricula (N) envolve Curso (N) contém Professor (N) contém (N)
