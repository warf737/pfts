<script>
export default {
  name: "UpdateMenus",
  data() {
    return {};
  },
  created() {
    this.map();
  },
  methods: {
    map() {
      const mainmenu = {
        ClassName: "mainmenu",
        Name: "Главное меню сотрудника банка",
        Children: [
          {
            Level: 0,
            Label: "ДБО",
            Children: [
              {
                Level: 1,
                Label: "Сообщения ФЛ",
                Route: "BISObjects",
                ClassName: "PersonMessages"
              },
              {
                Level: 1,
                Label: "Сообщения ЮЛ",
                Route: "BISObjects",
                ClassName: "OrganizationMessages"
              }
            ]
          }
        ]
      };

      const submenu = {
        Level: 0,
        Label: "ДБО",
        Children: [
          {
            Level: 1,
            Label: "Постоянные получатели",
            Route: "BISObjects",
            ClassName: "RegularRecipients"
          },
          {
            Level: 1,
            Label: "Настройки firebase",
            Route: "BISObjects",
            ClassName: "FirebaseSettings"
          },
          {
            Level: 1,
            Label: "Сертификаты УЦ КриптоПРО 2.0",
            Route: "BISObjects",
            ClassName: "CryptoProCertificates"
          },
          {
            Level: 1,
            Label: "Сообщения ФЛ",
            Route: "BISObjects",
            ClassName: "PersonMessages"
          },
          {
            Level: 1,
            Label: "Сообщения ЮЛ",
            Route: "BISObjects",
            ClassName: "OrganizationMessages"
          }
        ]
      };

      if (
        !mainmenu.Children[0].Children.every(
          messageMenu =>
            !!submenu.Children.find(
              chl => chl.ClassName === messageMenu.ClassName
            )
        )
      ) {
        console.log("записать меню");
        // await writeMenu(db, 'menus', 'mainmenu', mainmenu.Children[0], 'Label');
      } else {
        console.log("не записывать меню");
      }
    }
  }
};
</script>

<template>
  <div>empty component</div>
</template>

<style lang="scss" scoped></style>
