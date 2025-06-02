import React from "react";
import styles from "./page.module.css";
import AppHeader from "@/components/mainLayout/Header/AppHeader";

const Documentacion = () => {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            Documentación de Alquiler de Bicicletas
          </h1>
          <p className={styles.subtitle}>
            Guía sobre cómo utilizar la plataforma
          </p>
        </header>

        <main className={styles.main}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>¿Cómo funciona el sistema?</h2>
            <p>
              Nuestra plataforma permite a los estudiantes del instituto
              alquilar bicicletas de forma sencilla y rápida. Sigue estas
              instrucciones para realizar tus reservas.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Reservar una bicicleta</h2>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h3>Ver bicicletas disponibles</h3>
                <p>
                  En la página de <strong>Reservar</strong> podrás ver todas las
                  bicicletas disponibles para alquilar.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h3>Seleccionar bicicleta</h3>
                <p>
                  Haz clic en la bicicleta que deseas alquilar para acceder a la
                  pantalla de reserva específica.
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h3>Seleccionar fechas</h3>
                <p>
                  En la pantalla de reserva específica, selecciona:
                  <ul>
                    <li>Fecha de recogida: día en que recoges la bicicleta</li>
                    <li>
                      Fecha de devolución: día en que devuelves la bicicleta
                    </li>
                  </ul>
                </p>
              </div>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h3>Confirmar reserva</h3>
                <p>
                  Haz clic en el botón <strong>Reservar</strong> para confirmar
                  tu alquiler.
                </p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Mis Reservas</h2>
            <p>
              En la sección <strong>Mis Reservas</strong> podrás:
            </p>
            <ul>
              <li>Ver todas tus reservas activas</li>
              <li>Consultar las fechas de cada reserva</li>
              <li>Ver el estado de cada reserva</li>
              <li>Cancelar reservas futuras</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Normas de uso</h2>
            <div className={styles.rulesGrid}>
              <div className={styles.ruleCard}>
                <h3>Duración del alquiler</h3>
                <p>El alquiler máximo es de 1 mes, se puede renovar.</p>
              </div>
              <div className={styles.ruleCard}>
                <h3>Horario de recogida</h3>
                <p>
                  Las bicicletas deben recogerse entre las 8:00 y 22:00 horas.
                </p>
              </div>
              <div className={styles.ruleCard}>
                <h3>Responsabilidad</h3>
                <p>
                  El usuario es responsable del cuidado de la bicicleta durante
                  el período de alquiler.
                </p>
              </div>
              <div className={styles.ruleCard}>
                <h3>Multas</h3>
                <p>
                  Si rompes o dañas la bicicleta, debes hacerte cargo de los gastos del arreglo.
                  Si no devuelves la bicicleta se te vetará de la aplicación y se tomarán medidas legales.
                </p>
              </div>
            </div>
          </section>

          <section className={`${styles.section} ${styles.faqItem}`}>
            <h2 className={styles.sectionTitle}>Preguntas Frecuentes</h2>
            <div className={styles.faqItem}>
              <h3>¿Qué necesito para alquilar una bicicleta?</h3>
              <p>
                Debes ser estudiante activo del instituto.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3>¿Puedo cancelar una reserva?</h3>
              <p>
                Sí, puedes cancelar reservas futuras desde la sección Mis
                Reservas.
              </p>
            </div>
            <div className={styles.faqItem}>
              <h3>
                ¿Qué pasa si la bicicleta sufre daños durante mi alquiler?
              </h3>
              <p>Debes reportar cualquier daño inmediatamente.</p>
            </div>
          </section>
        </main>

        <footer className={styles.footer}>
          <p>
            © {new Date().getFullYear()} Hospital de Bicis - Instituto IES
            Hermenegildo Lanz
          </p>
          <p>by Cristina Díaz Cabello and Darío Peregrín Alconchel.</p>
        </footer>
      </div>
    </>
  );
};

export default Documentacion;
