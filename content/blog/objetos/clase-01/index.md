---
title: Primera Clase - Objetos
date: '2019-08-05'
description: Introducción a Objetos
tags: [objetos, metodo, identidad]
---

## Tarea para la clase que viene:

- Instalar [Wollok](https://www.wollok.org/en/download/)
- Terminar guías 1 y 2 de [Mumuki](https://mumuki.io/pdep-utn/lessons/76-programacion-con-objetos-objetos-y-mensajes)

## Introducción a objetos

Así como en funcional teníamos `funciones` y en lógico teníamos `reglas lógicas`, como sugiere el nombre, en esta parte de la materia vamos a estar trabajando con `objetos`.

Tenemos a `poroto`, el perro de una familia (vamos a escribir los objetos con camelCase).

![poroto](./poroto.png 'Diagrama poroto')

Por lo pronto tenemos la siguiente información acerca de Poroto: tiene 4 años y 100 de energía (porque todos los perros necesitan energía para hacer cosas, claro). Entonces, vamos a decir que poroto tiene como **atributos** edad y energia.
Así lo escribimos:

```js{2,3}
object poroto {
  var energia = 100
  var edad = 4
}
```

Y qué podemos hacer con poroto? Por ahora no mucho. Estaría bueno que sepa hacer más cosas, como jugar. Y cómo hacemos que poroto juegue? Se lo tenemos que decir (poroto, jugá!); y la forma que tenemos para decirle a un objeto que haga algo es enviarle un **mensaje**, y esto se hace así:

```js
poroto.jugar()
```

Los mensajes siempre son enviados a un objeto y son la manera de comunicarnos con los mismos.

¿Qué pasa si corremos el código anterior?

```js
// ERROR: poroto does not understand jugar() (line: 4)
```

Falla... claro, le dijimos a poroto que juegue, pero nunca le “enseñamos” cómo hacerlo. De alguna forma le tenemos que decir qué es lo que queremos que haga cuando le digamos que juegue, y esto lo hacemos con lo que llamamos un **método**.

> Un **método** es lo que un objeto hace cuando le enviamos un mensaje particular.

Enseñémosle entonces a poroto a jugar. Vamos a querer que cuando poroto juegue, su energía baje 20 unidades.

Esto en código se escribe así:

```js{5,6,7}
object poroto {
  var energia = 100
  var edad = 4

  method jugar() {
    energia = energia - 20 // ó energia -= 20
  }
}
```

¡Bien! Ahora `poroto` ya sabe que hacer cuando le digamos "jugar".

---

Queremos ver si su energía cambió, por lo que deberíamos preguntarle a poroto cuál es su energía. Para esto vamos a tener que declarar un **_getter_**.

```js
method energia() {
  return energia
}
```

Si quisiéramos cambiarla, haríamos un **_setter_**:

```js
method energia(unaEnergia) {
  energia = unaEnergia
}
```

> Este tipo de métodos en los que accedemos al valor de un atributo o lo modificamos se llaman **_accessors_**. No es necesario que todos los atributos tengan los suyos, sólo aquellos que los necesitan.

---

Ahora, vamos a crear otro objeto: vamos a crear al dueño de poroto, Billy. De Billy conocemos su edad, su comida favorita, su energía y su mascota.
Sabemos que Billy puede jugar con poroto, entonces podemos hacer un método que sea `jugarConMascota`, el cual haga que billy pierda 50 de energía (se cansa más rápido que su perro) y al mismo tiempo que poroto juegue.

```js{7-10}
object billy {
  var edad = 12
  const comidaFavorita = "asado"
  var energia = 200
  var mascota = poroto

  method jugarConMascota() {
    energia -= 50
    mascota.jugar()
  }

  method mascota() {
    return mascota;
  }
}
```

> `billy` le está mandando un mensaje a su `mascota`, que en este caso es poroto. Billy le dijo a su mascota jugá y poroto jugó.

---

Ahora agregamos a Mandy que tiene como mascota a su perra Sally que empieza con la misma energía y edad que poroto y pierde la misma energía al jugar. Hacemos que mandy juegue con su mascota dejando a Sally con el mismo estado que poroto.

```js
object mandy {
   var edad = 15
   const comidaFavorita = "milanesa"
   var energia = 200
   var mascota = sally

  method jugarConMascota() {
    energia -= 30
    mascota.jugar()
  }

  method mascota() {
    return mascota;
  }
}

object sally {
  var energia = 100
  var edad = 4

  method jugar() {
    energia = energia - 20
  }
}
```

¿Qué pasa si comparamos a Sally y Poroto? ¿Son Iguales?

```js
billy.mascota() == mandy.mascota() // false
```

Esto pasa porque los objetos tienen **identidad**, saben diferenciarse unos de otros, por lo que un objeto no es igual a otro aunque sus atributos tengan los mismos valores.
