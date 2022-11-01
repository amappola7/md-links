# 🌿 **Caesar's Chat**

![caesar's Chat](./assets_readme/thumb.png)
## Índice

* [1. Introducción.](#1-introducción)
* [2. Usuarios.](#2-usuarios)
* [3. Decisiones de diseño.](#3-decisiones-de-diseño)
* [4. Instalación y ejecución.](#4-instalación-y-ejecución)
* [5. Funcionalidad.](#5-funcionalidad)


***

## 1. Introducción
Caesar's Chat es una aplicación de mensajería en la que los usuarios podrán intercambiar mensajes de texto con la seguridad de que, si una persona externa puede entrar a su chat, no tenga forma de entender lo que ahí está contenido.
## 2. Usuarios
Los usuarios de Caesar's Chat son todas aquellas personas que que quieran tener una capa más de seguridad en su aplicación de mensajería cotidiana.

Su objetivo es el de encriptar los mensajes del día a día de los usuarios, con el fin de que si alguien tiene acceso a su dispositivo no pueda leerlos sin saber la clave de cifrado.

Caesar's Chat resuelve los problemas de privacidad más comunes de un usuario; que su pareja, familia, amigos u otras personas cercanas tomen abusivamente su dispositivo para conocer sus conversaciones privadas. Con nuestra app, tienen la posibilidad de hacerlas ininteligibles, descifrándolas con una clave que el/la dueño(a) del chat asignará y que sólo él/ella conocerá.

## 3. Decisiones de diseño
![Guía de estilos](./assets_readme/style-guide.png)
### **Prototipo**
#### Mensaje cifrado
![Prototipo. Demo 1](./assets_readme/demo.png)
#### Mensaje descifrado
![Prototipo. Demo 2](./assets_readme/demo2.png)
Puedes ver el prototipo de alta fidelidad y la guía de diseño [aquí.](https://www.figma.com/file/pnyPnNG9hWlM4HLBtKO1w2/Caesar-Cipher-Laboratoria?node-id=0%3A1)

## 4. Instalación y ejecución
La aplicación no necesita de ninguna instalación en tu dispositivo, puedes acceder a ella y ejecutarla directamente [aquí.](https://amappola7.github.io/caesar-cipher/src/)

## 5. Funcionalidad
Caesar's Chat usa el cifrado césar para encriptar los mensajes de un usuario.
La aplicación permite cifrar letras mayúsculas y minúsculas; por el momento no cifra números, ni caracteres especiales.

Para la encriptación implementa las funciones encode y decode ubicadas en el archivo cipher.js.
Ambas funciones trabajan de manera similar, donde toman como argumentos para su ejecución la clave de cifrado asignada por el usuario y el mensaje de texto enviado.
Durante este proceso, caracter por caracter, se realizan 3 tareas principales:

1. Obtener el número del código ASCII correspondiente a cada caracter.
2. Con el código ASCII desarrolla la fórmula de cifrado o descifrado según sea el caso.
3. El resultado de la fórmula es convertido nuevamente a caracter.

Cada función retorna un string con el texto cifrado / descifrado.

Al terminar las funciones son exportadas al archivo index.js, donde se ejecutan a través de eventos de tipo click asignados a botones.