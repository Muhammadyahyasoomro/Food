import React from "react";

export const CustomerFooter = () => {
  return (
    <footer class="text-center text-lg-start bg-body-tertiary text-muted">
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div class="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                <i class="fas fa-gem me-3"></i>YCODIES
              </h6>
              <p>
                YCODIES is a Sotfware house initiative lead my team of
                entpreuner's which are currently students of BIIT
              </p>
            </div>

            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 class="text-uppercase fw-bold mb-4">
                Technology based solutions
              </h6>
              <p>
                <a href="#!" class="text-reset">
                  NEXT JS
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  React JS
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  React Native
                </a>
              </p>
              <p>
                <a href="#!" class="text-reset">
                  Flutter
                </a>
              </p>
            </div>

            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <i class="fas fa-home me-3"></i>Islamabad,Pakistan
              </p>
              <p>
                <i class="fas fa-envelope me-3"></i>
                info@example.com
              </p>
              <p>
                <i class="fas fa-phone me-3"></i> +92 317 541 21 99
              </p>
              <p>
                <i class="fas fa-print me-3"></i> +92 314 544 35 98
              </p>
            </div>
          </div>
        </div>
      </section>

      <div
        class="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2021 Copyright:
        <a class="text-reset fw-bold" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
};
