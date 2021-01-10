<template>
  <q-page-container>
    <q-page padding>
      <div class="row justify-around">
        <div class="col-6">
          <q-card flat>
            <q-card-section>
              <p class="text-h3">About</p>
              <p class="text-body1">
                As part of the
                <a href="https://www.blokii.com/labs" target="_blank"
                  >Blokii Ecosystem</a
                >, this tool allows authors to create consistently branded
                images and easily generate an image with tech frameworks for
                blog posts. It provides a quick and easy way to overlay titles,
                subtitles, authors, and technology icons onto the image to
                create a blog post.
              </p>
              <p class="text-body1">
                Current planned features include implementing user accounts,
                being able to save templates, using brand images instead of
                default icons, saving image settings to an account (and much
                more once accounts are implemented).
              </p>
              <p class="text-body1">
                If you have any feature requests,
                <a href="https://twitter.com/rachel_cheuk" target="_blank"
                  >send me a message on Twitter</a
                >. I'm working on triaging features based on interest, so if you
                want your voice to be heard, tell me what you find useful and
                would like to see in the next release.
              </p>
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
