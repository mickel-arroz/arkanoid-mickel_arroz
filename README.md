<!DOCTYPE html>
<html lang="es">
<body>
    <div class="container">
        <header>
            <h1>ARKANOID</h1>
            <div class="subtitle">Versión personalizada por Mickel Arroz</div>
            <div class="btn-group">
                <a href="https://github.com/mickel-arroz/arkanoid-mickel_arroz" class="btn" target="_blank">Ver Código en GitHub</a>
                <a href="https://portfolio-mickel-arroz.vercel.app/" class="btn" target="_blank">Portafolio del Autor</a>
            </div>
        </header>        
        <section class="section">
            <h2>🎮 Acerca del Juego</h2>
            <p>Arkanoid es un clásico juego arcade de 1986 donde controlas una nave espacial (pala) en la parte inferior de la pantalla, con el objetivo de destruir todos los ladrillos en la parte superior usando una pelota que rebota.</p>
            <div class="note">
                <p>Esta versión personalizada incluye elementos únicos como diseños de niveles creativos, diferentes dificultades y una estética retro modernizada.</p>
            </div>
            <h3>Características Destacadas</h3>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>🎨 Diseños Creativos</h3>
                    <p>5 niveles únicos con patrones de ladrillos que forman figuras como aliens, calaveras y dragones.</p>
                </div>
                          <div class="feature-card">
                    <h3>⚙️ Dificultades Variables</h3>
                    <p>Elige entre 4 niveles de dificultad: Fácil, Normal, Difícil y Extremo.</p>
                </div>
                                <div class="feature-card">
                    <h3>🎯 Mecánicas de Rebote Mejoradas</h3>
                    <p>La pelota cambia su ángulo de rebote según el punto de impacto con la pala.</p>
                </div>
                                <div class="feature-card">
                    <h3>📊 Sistema de Puntuación</h3>
                    <p>Gana puntos por cada ladrillo destruido y compite por la mejor puntuación.</p>
                </div>
            </div>
        </section>
                     <section class="section">
            <h2>🕹️ Cómo Jugar</h2>
                        <h3>Controles</h3>
            <div class="controls">
                <div class="control-group">
                    <h3>Teclado</h3>
                    <p>← → : Mover la pala izquierda/derecha</p>
                    <p>P : Pausar/Reanudar el juego</p>
                </div>
                              <div class="control-group">
                    <h3>Interfaz</h3>
                    <p>START : Comenzar juego</p>
                    <p>PAUSA : Pausar juego</p>
                    <p>Selector de nivel : Cambiar nivel</p>
                    <p>Selector de dificultad : Ajustar desafío</p>
                </div>
            </div>
                        <h3>Objetivo</h3>
            <p>Destruye todos los ladrillos en el nivel usando la pelota sin dejarla caer al vacío. Cada ladrillo destruido te da 10 puntos.</p>
                        <h3>Mecánica de Rebote</h3>
            <p>El ángulo de rebote de la pelota cambia dependiendo de dónde impacte en la pala:</p>
            <ul>
                <li>Centro de la pala: Rebote vertical</li>
                <li>Extremos: Rebote con mayor ángulo</li>
            </ul>
        </section>
                      <section class="section">
            <h2>💻 Tecnologías Utilizadas</h2>
                        <div class="tech-grid">
                <div class="tech-item">
                    <h3>HTML5</h3>
                    <p>Estructura del juego</p>
                </div>
                             <div class="tech-item">
                    <h3>CSS3</h3>
                    <p>Estilos y diseño</p>
                </div>
               <div class="tech-item">
                    <h3>JavaScript</h3>
                    <p>Lógica del juego</p>
                </div>
                <div class="tech-item">
                    <h3>Canvas API</h3>
                    <p>Renderizado gráfico</p>
                </div>
            </div>
            <h3>Estructura del Proyecto</h3>
            <div class="code-block">
                arkanoid-mickel_arroz/<br>
                ├── index.html          # Archivo principal<br>
                ├── styles.css          # Estilos del juego<br>
                ├── script.js           # Lógica del juego<br>
                ├── public/             # Assets del juego<br>
                │   ├── arcade-favicon.svg<br>
                │   ├── bkg.png<br>
                │   ├── bricks.png<br>
                │   ├── marco-sprite.png<br>
                │   ├── sprite-title.png<br>
                │   ├── sprite.png<br>
                │   └── fonts/         # Fuentes personalizadas<br>
                └── README.html         # Este archivo
            </div>
        </section>
        <section class="section">
            <h2>🚀 Instalación y Uso</h2>
            <h3>Requisitos</h3>
            <p>Navegador web moderno (Chrome, Firefox, Edge, Safari)</p>
            <h3>Ejecutar el Juego</h3>
            <p>Simplemente abre el archivo <code>index.html</code> en tu navegador para comenzar a jugar.</p>
            <h3>Personalización</h3>
            <p>Puedes modificar los siguientes aspectos del juego:</p>
            <div class="code-block">
                // Cambiar niveles (script.js)<br>
                const levels = [ ... ]; // Modifica los diseños de los niveles<br><br>
                // Ajustar dificultades<br>
                const difficultySettings = {<br>
                &nbsp;&nbsp;facil: { ballMultiplier: 1, paddleSpeed: 6 },<br>
                &nbsp;&nbsp;normal: { ballMultiplier: 2, paddleSpeed: 8 },<br>
                &nbsp;&nbsp;// ...<br>
                };
            </div>
        </section>
        <div class="pixel-decoration"></div>
        <section class="section">
            <h2>🙏 Agradecimientos</h2>
            <p>Este proyecto fue inspirado y desarrollado siguiendo los conceptos aprendidos de:</p>
            <div class="note">
                <p>MiduDev - por su excelente contenido educativo de programación</p>
            </div>
            <p>Gracias a la comunidad de desarrolladores por su apoyo y recursos compartidos.</p>
        </section>
        <footer>
            <p>© 2025 Mickel Arroz - Todos los derechos reservados</p>
            <p>Proyecto educativo creado con HTML5, CSS3 y JavaScript</p>
            <div class="btn-group">
                <a href="https://github.com/mickel-arroz" class="btn" target="_blank">GitHub del Autor</a>
                <a href="https://portfolio-mickel-arroz.vercel.app/" class="btn" target="_blank">Portafolio Profesional</a>
            </div>
        </footer>
    </div>
</body>
</html>
