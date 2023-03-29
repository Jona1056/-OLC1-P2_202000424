%lex 

%options case-insensitive 
//inicio analisis lexico
%%

// palabras reservadas y expresiones regulares

"imprimir"      return 'RESPRINT';

"+"             return 'MAS';
"-"             return 'MENOS';

";"             return 'PTCOMA';
"("             return 'PARABRE';
")"             return 'PARCIERRA';

[ \r\t]+ { }
\n {}
\"[^\"]*\"                  { yytext=yytext.substr(1,yyleng-2); return 'CADENA'; }
[0-9]+                      return 'ENTERO';
[A-Za-z]+["_"0-9A-Za-z]*    return 'IDENTIFICADOR';

<<EOF>>                                                     return 'EOF';
.                                                           return 'INVALID'

/lex

%left 'MAS' 'MENOS'

%start INIT
//Inicio
//Definicion de gramatica
%%

INIT: INSTRUCCIONES EOF  {
        return new Production(
            new Three.default($1.getResult(), errors),
            [$1, 'EOF'],
            'INIT'
        );
    }                                                        
;

INSTRUCCIONES : 
    INSTRUCCIONES INSTRUCCION {
        $$ = new Production(
            [...$1.getResult(), $2.getResult()],
            [$1, $2],
            'INSTRUCCIONES'
        );
    }
    | INSTRUCCION {
        $$ = new Production(
            [$1.getResult()],
            [$1],
            'INSTRUCCIONES'
        );
    }
;

INSTRUCCION :
    IMPRIMIR PTCOMA {
        $$ = new Production(
            $1.getResult(),
            [$1, $2],
            'INSTRUCCION'
        );
    }
    | INVALID               {
        $$ = new Production(
            new errores.default('ERROR LEXICO',$1,@1.first_line,@1.first_column),
            ['ERROR LEXICO'],
            'INSTRUCCION'
        );
    }
    | error  PTCOMA        {
        $$ = new Production(
            new errores.default(`ERROR SINTACTICO`,"Se esperaba token",@1.first_line,@1.first_column),
            ['ERROR SINTACTICO'],
            'INSTRUCCION'
        );
    }
;

IMPRIMIR : 
    RESPRINT PARABRE EXPRESION PARCIERRA {
        $$ = new Production(
            new impresion.default($3.getResult(), @1.first_line, @1.first_column),
            [$1, $2, $3, $4],
            'IMPRIMIR'
        );
    }
;

EXPRESION: 
    EXPRESION MAS EXPRESION {
        $$ = new Production(
            new aritmetico.default(aritmetico.tipoOp.RESTA, $1.getResult(), $3.getResult(), @1.first_line, @1.first_column),
            [$1, $2, $3],
            'EXPRESION'
        );
    }
    | EXPRESION MENOS EXPRESION {
        $$ = new Production(
            new aritmetico.default(aritmetico.tipoOp.SUMA, $1.getResult(), $3.getResult(), @1.first_line, @1.first_column),
            [$1, $2, $3],
            'EXPRESION'
        );
    }
    | ENTERO {
        $$ = new Production(
            new nativo.default(new tipo.default(tipo.DataType.ENTERO), $1, @1.first_line, @1.first_column),
            [$1],
            'EXPRESION'
        );
    }
    | CADENA {
        $$ = new Production(
            new nativo.default(new tipo.default(tipo.DataType.CADENA), $1, @1.first_line, @1.first_column),
            [$1],
            'EXPRESION'
        );
    }
;