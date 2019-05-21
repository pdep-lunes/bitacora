---
title: Octava clase
date: '2019-05-20'
description: ‘Hechos, reglas y universo cerrado'
tags: [logico, hechos, reglas, disyuncion, conjuncion]
---

## Tarea para la clase que viene:

- Hacer las lecciones 1 y 2 de [Mumuki](https://mumuki.io/pdep-utn/chapters/307-programacion-logica).
- Instalarse y amigarse con [Prolog](http://www.pdep.com.ar/software/software-swi-prolog).

## ¿Empezar de nuevo? ¡Lógico!

Primero olvídense de todo lo que vieron hasta este momento. Paradigma nuevo, vida nueva 😎. Para comenzar, en funcional teníamos funciones que nos devolvían cosas. En lógico no existen las funciones ni se devuelve nada 😮. Sí podemos hacer consultas y obtener respuestas. 😌

Todo lo que sepamos va a estar escrito en una **base de conocimientos** en forma de **predicados** que pueden ser **hechos** o **reglas**. Todo lo que no esté en esta base será considerado falso porque no podemos probar que es verdadero. Esto se conoce como **principio de universo cerrado**.

¿Cuál es la diferencia entre hechos y reglas? 🤔 Los hechos ¡son siempre verdaderos! En cambio, el valor de verdad (`True` o `False`) de las reglas depende de otros predicados. Los hechos me permiten definir verdades por extensión. Las reglas me permiten hacer esa misma definición por comprensión.

Veamos algunos ejemplos:

```prolog
esComic(sandman).
esComic(watchmen).

esLibro(americanGods).
esLibro(fundacion).
esLibro(yoRobot).
esLibro(cuentosDeLocuraAmorYMuerte).

escribio(neilGaiman, sandman).
escribio(alanMoore, watchmen).
escribio(neilGaiman, americanGods).
escribio(isaacAsimov, fundacion).
escribio(isaacAsimov, yoRobot).

esDeArgentina(joseHernandez).
esDeArgentina(jorgeLuisBorges).
esDeUruguay(horacioQuiroga).


escribeEnRioDeLaPlata(AutorOAutora) :-
	escribio(_, AutorOAutora),
	esDelRioDeLaPlata(AutorOAutora).

esDelRioDeLaPlata(AutorOAutora) :-
	esDeArgentina(AutorOAutora).

esDelRioDeLaPlata(AutorOAutora) :-
	esDeUruguay(AutorOAutora).
```

¿Entonces? `esComic`, `esLibro`, `escribio`, `esDeArgentina`, `esDeUruguay` son hechos. Mientras que `escribeEnRioDeLaPlata` y `esDelRioDeLaPlata` son reglas.
Q2.
Analicemos nuestra base de conocimientos:

- `fundacion`, por ejemplo, está en minúscula porque es algo particular, un **individuo**.
- `AutorOAutora` es una **variable**, o **incógnita**, por lo que siempre irá en mayúscula.
- `esComic` tiene dos **cláusulas**, `esLibro` tiene cuatro, `escribio` tiene cinco, `esDeArgentina` tiene dos… ¿y te animás a pensar de las que faltan? (Si tenés dudas preguntale a tu tutor o tutora).
- La **conjunción lógica** (el Y) se hace con comas (`,`) mientras que la **disyunción lógica** (el O) se hace declarando más cláusulas.
- La cantidad de parámetros que recibe un predicado denota su aridad. Por ejemplo, `escribio` tiene dos parámetros por lo que decimos que su aridad es 2 y lo representamos así: `escribio/2`.
- Los predicados de aridad uno son **propiedades**, mientras que los de aridad mayor a uno son **relaciones**.

Teniendo toda esta información, ¿dónde hacemos las _consultas_? Vamos a hacerlas en Prolog. 🦉
Y habrá dos tipos diferentes de ellas:

- **existenciales**: en las cuales podemos preguntar si existe algún individuo que haga verdadero a un predicado.
- **individuales**: en las cuales podemos preguntar si un individuo particular hace verdadero a un predicado.

Por último, te dejamos el repo con la base de conocimientos que vimos hoy [acá](https://github.com/pdep-lunes/base-de-conocimientos).

## Links útiles:

- [Universo cerrado](http://wiki.uqbar.org/wiki/articles/paradigma-logico---introduccion.html)
- [¿Qué podemos encontrar en lógico?](http://wiki.uqbar.org/wiki/articles/paradigma-logico---un-poco-de-nomenclatura.html)
- [Conjunción y disyunción](http://wiki.uqbar.org/wiki/articles/paradigma-logico---conjuncion-y-disyuncion.html)
- [Consulta existencial](http://wiki.uqbar.org/wiki/articles/paradigma-logico---multiples-respuestas.html)
