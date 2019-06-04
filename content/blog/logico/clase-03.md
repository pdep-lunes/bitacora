---
title: Décima clase
date: '2019-06-03'
description: 'Functores, is, pattern matching y polimorfismo. Findall, listas e is'
tags: [logico, functores, pattern-matching, polimorfismo, findall, is, listas]
---

## Tarea para la clase que viene
- Terminar el TP grupal.
- Hacer hasta la lección 11 (inclusive) de [Mumuki](https://mumuki.io/pdep-utn/chapters/307-programacion-logica)

## Functores
Hasta ahora, en lógico siempre hicimos consultas en las cuales nuestros individuos eran simples.
Pero además de los individuos simples, también existen los **individuos complejos**. 🧐
Los *functores* son individuos complejos y tienen:
- Un nombre que los identifica
- Una aridad

En nuestra base de conocimientos teníamos libros, ahora conocemos los tipos de libros, que pueden ser:
- `novela(Genero, CantidadDePaginas)`
- `libroDeCuentos(CantidadDeCuentos)`
- `cientifico(Disciplina)` 
- `bestSeller(Precio, CantidadDePaginas)`

Además contamos con un predicado `tipo/2` que relaciona a cada libro con su tipo.

Ahora queremos saber si un libro está bueno, esto se cumple cuando:
- Es una novela policial y tiene más de 150 páginas.
- Es una novela de terror.
- Los libros con más de 10 cuentos siempre son buenos.
- Es un libro científico de fisicaCuantica.
- Es un best seller y el precio por página es menor a $50.

```prolog
estaBueno(Libro):-
    tipo(Libro, novela(policial, Paginas)),
    Paginas > 150.
estaBueno(Libro):-
    tipo(Libro, novela(terror, _)).
estaBueno(Libro):-
    tipo(Libro, libroDeCuentos(CantidadDeCuentos)),
    CantidadDeCuentos > 10.
estaBueno(Libro):-
    tipo(Libro, cientifico(fisicaCuantica)).
estaBueno(Libro):-
    tipo(Libro, bestSeller(Precio, Paginas)),
    Precio / Paginas < 50.
```
> Si bien los functores se escriben como un predicado, **NO** son un predicado. Como ven, los estamos usando como parámetro en nuestras consultas.

Ahora, mirando 🔭 un poco a nuestro código anterior, podemos ver lógica repetida y eso no nos gusta mucho. 👎

Veamos cómo podríamos cambiar esto...


```prolog
estaBueno(Libro):-
    tipo(Libro, Tipo),
    esTipoCopado(Tipo).
esTipoCopado(novela(policial, Paginas)):-
    Paginas > 150.
esTipoCopado(novela(terror, _)).
esTipoCopado(libroDeCuentos(CantidadDeCuentos)):-
    CantidadDeCuentos > 10.
esTipoCopado(cientifico(fisicaCuantica)).
esTipoCopado(bestSeller(Precio, Paginas)):-
    Precio / Paginas < 50.
```

Tenemos un par de cosas interesantes aquí. 🤔

Primero, si prestamos atención a cómo definimos el predicado `esTipoCopado`, podemos ver que estamos **deconstruyendo** (o abriendo) a los functores que representan el tipo de los libros.  
Por ejemplo, en esta claúsula, el tipo va a unificar sólo con aquellas novelas que sean policiales.
```prolog
esTipoCopado(novela(policial, Paginas)):-
    Paginas > 150.
% además la variable Paginas va a unificar
% con la cantidad de páginas de esa novela
```
Además, cada functor va a "saber" con qué claúsula del predicado quedarse.  
Todo esto gracias a que tenemos *Pattern Matching*. 🎉

En segundo lugar, podemos ver como al predicado `tipoCopado` no le importa para nada que *forma* puede llegar a tener el functor del tipo de libro.  
Al hecho de tratar variables indistintamente de su forma lo llamamos **polimorfismo** 💗 y va a ser un concepto muy importante y útil desde ahora hasta siempre. 😱

## Findall
Ahora queremos saber el puntaje de un autor, este se calcula como `3 * cantidad de libros buenos que escribió`.

Recordemos, que en nuestra base de conocimientos, contamos con un predicado `escribio/2` que relaciona a un autor con el libro que escribió.

Podríamos empezar escribiendo un predicado que relacione un autor con un libro bueno que haya escrito:
```prolog
escribioLibroBueno(Autor, Libro):-
    escribio(Autor, Libro),
    estaBueno(Libro).
```

Y en nuestra consola podemos hacer consultas como esta:
```prolog
?- escribioLibroBueno(Autor, Libro).
Autor = stephenKing,
Libro = it ;
Autor = horacioQuiroga,
Libro = cuentosDeLaSelva ;
Autor = stephenKing,
Libro = misery ;
Autor = stephenKing,
Libro = elJuegoDeGerald ;
Autor = stephenKing,
Libro = carrie .
```
Si bien, como `escribioLibroBueno` es inversible, podemos consultar por los valores que puede tomar la variable `Libro`. ¿Pero cómo podríamos trabajar con todos los libros buenos que escribió un autor al mismo tiempo? Bueno, podríamos agruparlo en una **lista**!!

Para lograr esto contamos con un predicado llamado `findall/3`. Este se escribe de la forma `findall(Formato, Consulta, Lista)` y es inversible para su último argumento.

Entonces, ahora podríamos escribir un predicado `librosBuenosQueEscribio/2` que relacione a un autor con todos los libros que escribió y que además están buenos.

```prolog
librosBuenosQueEscribio(Autor, Libros):-
    autor(Autor),
    findall(Libro, escribioLibroBueno(Autor, Libro), Libros).
```
Y podemos consultar:

```prolog
?- librosBuenosQueEscribio(stephenKing, Libros).
Libros = [it, misery, carrie, elJuegoDeGerald]
% notar que también podríamos hacer consultas
% dejando al Autor como variable (es totalmente inversible)
```
Ahora, la cantidad de libros buenos que escribió ese autor sería el tamaño de esa lista.  
Y bueno, ¿cómo creen que prolog podría relacionar a una lista con su tamaño?  
Sí, ¡con un predicado 🤩! Contamos con `length(Lista, Tamanio)`, que es inversible para el tamaño.

Entonces podríamos escribir:
```prolog
cantidadDeLibrosBuenos(Autor, Cantidad):-
    librosBuenosQueEscribio(Autor, UnosLibros),
    length(UnosLibros, Cantidad).
```

Y ahora, por fin, ya podemos resolver nuestro problema inicial 😝:

```prolog
puntaje(Autor, Puntaje):-,
    cantidadDeLibrosBuenos(Autor, Cantidad),
    Puntaje is 3 * Cantidad.
```

## is
Pero, un momento, ¿qué es esto de `is`?  
Bueno, `is` es un predicado que relaciona a una cuenta *(a la derecha)* con su resultado *(a la izquierda)*. Es inversible para el resultado: liga la variable del `Resultado` al resultado de la expresión matemática de la derecha.
```prolog
Resultado is ExpresionMatematica
```
Entonces:
- ¿Cuándo usamos `is`?  
Bueno, **solamente** cuando necesitamos realizar cuentas.
- ¿Y en en dónde más?  
En ningún otro caso. Usar `is` sólo para ligar variables está **MAL** y nadie quisiera reprobar su parcial de lógico por eso. 👮🏻‍

#### Ejercicios
- Ahora queremos conocer el `promedioDePuntajes` que es el promedio de puntajes de todos los escritores.

```prolog
promedioDePuntajes(Promedio):-
  findall(Puntaje, puntaje(_, Puntaje), ListaPuntajes),
  sumlist(ListaPuntajes, Total),
  length(ListaPuntajes, CantidadPuntajes),
  Promedio is Total / CantidadPuntajes.
```

- Queremos saber si un escritor merece un nobel, esto sucede sólo si todo lo que escribió es bueno. 
```prolog
mereceUnNobel(Autor) :-
  esAutor(Autor),
  forall(escribio(Autor, Libro), estaBueno(Libro)).
```

## Links útiles
- [Wiki functores](http://wiki.uqbar.org/wiki/articles/paradigma-logico---functores.html)
- [Wiki polimorfismo](http://wiki.uqbar.org/wiki/articles/polimorfismo-en-el-paradigma-logico.html)
- [Wiki aritmética/is](http://wiki.uqbar.org/wiki/articles/aritmetica-en-prolog.html)
- [Wiki findall/listas](https://github.com/uqbar-project/wiki/blob/master/wiki/articles/paradigma-logico---listas.md)
- [Código de la clase de hoy](https://gist.github.com/mnmallea/c2378a0afe713b483c3f233ca12d2f5e)
