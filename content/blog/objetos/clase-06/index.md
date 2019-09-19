---
title: Sexta Clase - Objetos
date: '2019-09-16'
description: Dr Casa 1.
tags: [objetos, clases, modelado]
---

# ¿Qué hicimos?

- Ejercicio de [dr casa](https://docs.google.com/document/d/1bCxds9TaxA_wISqUt-lz_jvnQgYiEkRpxFp0IWRtLNw/edit?usp=sharing)
- Puesta en común y debate

## Enfermedades ¿una clase o dos?

Lo primero que discutimos era si convenia tener una sola clase o una clase por cada tipo de enfermedad.

```js
// Versión de una sola clase
class Enfermedad {
  var celulasQueAmenaza
  var diasEnElCuerpo
  const tipoDeEnfermedad // sería "infecciosa" ó "autoinmune"

  method esAgresiva() {
    if (tipoDeEnfermedad == "infecciosa") {
      // hacer algo
    } else if (tipoDeEnfermedad == "autoinmune") {
      // hacer otra cosa
    }
  }
  // ... más métodos
}
```

Lo que vimos es que en el caso de tener una sola clase ibamos a tener las siguientes contras:

- Tenemos que usar `if`s recurrentemente para separar el comportamiento particular de cada tipo, y que eso no es fácil de extender en caso de que aparezca otra enfermedad que sea de otro tipo o incluso de los dos tipos al mismo tiempo.
- Tenemos estado que no usan los dos tipos de clase (`diasEnElCuerpo` por ejemplo).

Entonces optamos por usar la versión con dos clases, una para cada tipo de enfermedad.

```js
// Versión de dos clases
class EnfermedadAutoinmune {
  var celulasQueAmenaza // se inicializa en el constructor
  var diasInfectando = 0

  method pasarDia(persona) {
    diasInfectando++
    self.producirEfecto(persona)
  }

  method producirEfecto(persona) {
    persona.perderCelulas(celulasQueAmenaza)
  }

  method esAgresiva(persona) {
    return diasInfectando > 30
  }
}

class EnfermedadInfecciosa {
  var celulasQueAmenaza // se inicializa en el constructor

  method pasarDia(persona) {
    self.producirEfecto(persona)
  }

  method producirEfecto(persona) {
    persona.aumentarTemperatura(celulasQueAmenaza * 0.001)
  }

  method reproducirse() {
    celulasQueAmenaza *= 2
  }

  method esAgresiva(persona) {
    return celulasQueAmenaza > persona.celulas() * 0.1
  }
}
```

## Método esAgresiva

Discutimos también si valía la pena o no tener un parámetro innecesario, sin usar, en el método `esAgresiva` de la clase `EnfermedadAutoinmune`. Llegamos a la conclusión de que si lo valía porque ahora podíamos tratar a las enfermedades, sin importar su tipo, de manera indistinta, es decir, preferimos poder usarlas polimorficamente.
