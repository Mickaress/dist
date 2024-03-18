<script setup lang="ts">
  import { useMainNavigationRoutes } from '@/hooks/useRoutes';
  import AppLogo from '../ui/AppLogo.vue';
  import BaseButton from '../ui/BaseButton.vue';
  import BaseContainer from '../ui/BaseContainer.vue';

  const mainRoutes = useMainNavigationRoutes();
</script>

<template>
  <footer class="footer">
    <BaseContainer class="container">
      <div>
        <AppLogo is-footer />

        <BaseButton
          variant="text"
          class="initials"
          is="a"
          href="https://www.istu.edu/"
          target="_blank"
        >
          <p class="thin">
            Федеральное Государственное Бюджетное Образовательное Учреждение
            высшего образования
          </p>
          <p>
            "Иркутский Национальный Исследовательский Технический Университет"
          </p>
        </BaseButton>
      </div>

      <nav>
        <ul class="nav-list">
          <li v-for="link in mainRoutes" :key="link.name">
            <BaseButton
              variant="text"
              is="router-link"
              :to="{ name: link.name }"
            >
              {{ link.meta.title }}
            </BaseButton>
          </li>
        </ul>
      </nav>

      <div class="divider"></div>

      <section>
        <h3 class="info-title">Техническая поддержка:</h3>
        <ul class="info-list">
          <li class="info-item">
            Телефон:
            <BaseButton
              variant="text"
              is="a"
              href="tel:+73952405164"
              target="_blank"
            >
              +7 (3952) 40-51-64
            </BaseButton>
          </li>
          <li class="info-item">
            E-mail:
            <BaseButton
              variant="text"
              is="a"
              href="mailto:arshinskyv@istu.edu"
              target="_blank"
            >
              arshinskyv@istu.edu
            </BaseButton>
          </li>
          <li class="info-item">
            Telegram:
            <BaseButton
              variant="text"
              is="a"
              href="https://t.me/vlarsh"
              target="_blank"
            >
              @vlarsh
            </BaseButton>
          </li>
        </ul>
      </section>

      <section>
        <h3 class="info-title">Контакты организации:</h3>
        <ul class="info-list">
          <li class="info-item">664074, г. Иркутск ул. Лермонтова 83</li>
          <li class="info-item">
            Телефон:
            <BaseButton
              variant="text"
              is="a"
              href="tel:+73952405000"
              target="_blank"
            >
              +7 (3952) 405-000
            </BaseButton>
          </li>
          <li class="info-item">
            Справочная:
            <BaseButton
              variant="text"
              is="a"
              href="tel:+73952405009"
              target="_blank"
            >
              +7 (3952) 405-009
            </BaseButton>
          </li>
          <li class="info-item">
            E-mail:
            <BaseButton
              variant="text"
              is="a"
              href="mailto:info@istu.edu"
              target="_blank"
            >
              info@istu.edu
            </BaseButton>
          </li>
        </ul>
      </section>
    </BaseContainer>
  </footer>
</template>

<style lang="scss" scoped>
  .footer {
    padding: 3.5rem 0 2.25rem;
    margin-top: 8.75rem;
    background-color: var(--dark-color);
  }
  .container {
    display: grid;
    grid-template-columns: 1fr repeat(5, auto);
    column-gap: 4.375rem;
    max-width: 112.5rem;
  }
  .initials {
    display: block;
    max-width: 26em;
    margin-top: 7em;
    color: var(--light-color);
    text-transform: none;

    &:active {
      color: var(--light-color);
    }

    p {
      color: var(--light-color);
      font-weight: 300;
      font-size: 0.875rem;
      line-height: 1.5;
    }
    .thin {
      font-weight: 400;
    }
  }
  .nav-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    a {
      color: var(--light-color);
    }
  }
  .divider {
    width: 0.0625rem;
    height: 100%;
    background-color: var(--light-color);
  }
  .info-title {
    color: #fff;
    margin-bottom: 1.25rem;
  }
  .info-list {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }
  .info-item {
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--dark-gray-color);
    text-transform: uppercase;
    a {
      color: var(--dark-gray-color);
      font-size: 0.875rem;
    }
  }
</style>
