const bcrypt = require("bcrypt");
const bcryptSalt = 10;

exports.users = [
  {
    username: "admin",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt))
  }
];

exports.protests = [
  {
    name: "Blumen verschenken",
    description: "Jedem Polizisten eine Blume in die Hand drücken.",
    time: "während",
    time_investment: "Dauer des Festivals",
    level: "einfach",
    nof_people: "irrelevant",
    material_costs: "Keine -- Blumen werden vor Ort gepflückt",
    rating: 2.5
  },
  {
    name: "Polizistenbereiche einrichten",
    description:
      "Ähnlich den gelb markierten Raucherbereichen auf Banhöfen, gelb markierte 'Polizistenbereiche' überall neben den Dixis errichten",
    time: "davor",
    time_investment: "Halber Tag",
    level: "einfach",
    nof_people: "10",
    material_costs: "2,50€ pro Sprühdose mit biologisch abbaubarer, gelber Farbe",
    rating: 2.5
  },
  {
    name: "Lorem ipsum",
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed luctus blandit vehicula. Praesent cursus nibh sit amet mauris semper finibus. Sed sit amet lacus ut mi sagittis consectetur eget gravida elit. Duis finibus fermentum mi sit amet condimentum. Morbi porta odio ac erat vulputate dignissim. Maecenas commodo sit amet neque et posuere. Quisque eu mauris pretium neque finibus venenatis. Nunc non hendrerit libero. Maecenas pretium ex a vehicula auctor.

      Pellentesque blandit aliquet sem a imperdiet. Duis ut massa neque. Phasellus vel risus ut mi ultricies tempus. Curabitur congue eros quis vestibulum convallis. Praesent et sapien vehicula, mattis odio at, ornare nunc. Fusce efficitur mi ipsum. Curabitur vel metus eget est interdum luctus sed id nisi. Vestibulum tempor sollicitudin elit in tempor. Donec mollis ornare purus eu pretium. Aliquam in ipsum auctor, molestie sem non, vulputate velit.`,
    time: "danach",
    time_investment: "50 Minuten",
    level: "schwierig",
    nof_people: "100",
    material_costs: "50€ Unkostenbeitrag",
    rating: 2.5
  }
];
