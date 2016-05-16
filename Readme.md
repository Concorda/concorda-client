![Banner][]

# Concorda Plugin for client application
Concorda-client: User management system

- __Lead Maintainer:__ [Mircea Alexandru][lead]
- __Sponsor:__ [nearForm][]


A detailed documentation can be found in [Concorda wiki](https://github.com/nearform/concorda/blob/master/doc/Readme.md).

# Contributing
The [Concorda][] encourages open participation. If you feel you can help in any way, be it with
documentation, examples, extra testing, or new features please get in touch.

# Using Concorda client

Use it like any other seneca plugin

```
npm install seneca-concorda --save
```

```
  var Concorda = require('seneca-concorda');
  seneca
    .use(Concorda, {
        mesh: {
          active: true
        },
        transport: {
          active: true,
          type: 'tcp'
        },
        auth: {
          restrict: '/api',
          password: 'some password with lenght grater than 32'
        }
      }
    )
```

- [Code of Conduct]

# License
Copyright (c) 2016, nearForm and other contributors.
Licensed under [MIT][].

[Banner]: https://raw.githubusercontent.com/nearform/concorda-dashboard/master/public/client/assets/img/logo-concorda-banner.png
[MIT]: ./LICENSE
[Code of Conduct]: https://github.com/nearform/vidi-contrib/docs/code_of_conduct.md
[Concorda]: https://github.com/Concorda/concorda
[lead]: https://github.com/mirceaalexandru
[nearForm]: http://www.nearform.com/
[seneca-concorda]: https://github.com/Concorda/seneca-concorda
[NodeZoo]: http://www.nodezoo.com/
