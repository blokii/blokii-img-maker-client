<template>
  <q-page-container>
    <q-page padding>
      <div class="row justify-around">
        <div class="col-8">
          <q-card flat square>
            <q-card-section>
              <p class="text-h3">Frequently Asked Questions</p>
              <p class="text-body-1">
                <a href="https://www.twitter.com/rachel_cheuk" target="_blank">
                  Tweet (@rachel_cheuk)</a
                >
                if you need help! More documentation coming soon!
              </p>
              <q-list bordered class="rounded-borders">
                <q-expansion-item
                  expand-separator
                  icon="fad fa-question"
                  label="Can I use other fonts?"
                  header-class="text-weight-bold"
                >
                  <q-card>
                    <q-card-section>
                      Selectable fonts are fixed for now. Send in your requests!
                      I'll see what I can do in the future to incorporate more
                      fonts.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fad fa-question"
                  label="Can I apply more than one filter?"
                  header-class="text-weight-bold"
                >
                  <q-card>
                    <q-card-section>
                      Not yet. Let me know if you would like this feature.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fad fa-question"
                  label="How can I save my settings?"
                  header-class="text-weight-bold"
                >
                  <q-card>
                    <q-card-section>
                      It's on the product roadmap, but I need motivation. Let me
                      know if you really want this so I can prioritize feature
                      requests!
                    </q-card-section>
                  </q-card>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fad fa-question"
                  label="How can I add a tech icon?"
                  header-class="text-weight-bold"
                >
                  <q-card>
                    <q-card-section>
                      Icons are currently limited to a specific set made
                      available by the
                      <a
                        href="https://fontawesome.com/icons?d=gallery&s=brands"
                        target="_blank"
                        >FontAwesome Brands Icon Set</a
                      >. If there's a tech framework you regularly blog about
                      and would like to be able to add to your image, let me
                      know.
                    </q-card-section>
                  </q-card>
                </q-expansion-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<style lang="scss" scoped>
a {
  font-weight: bold;
  text-decoration: none;
  color: black;
}
body {
  font-size: 1.1em;
}
</style>
