<!doctype html>

<html
    lang="en"
    class="light-style layout-navbar-fixed layout-menu-fixed layout-wide"
    dir="ltr"
    data-theme="theme-default"
    data-assets-path="../../assets/"
    data-template="vertical-menu-template-no-customizer-starter">
    <head>
        <meta charset="utf-8" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

        <title>@yield('title') | {{ config('app.name', 'Talenta') }}</title>

        <meta name="description" content="Aplikasi Talenta menghubungkan perusahaan dan pencari kerja dengan platform digital modern dari Dinas Tenaga Kerja Kabupaten Jombang." />

        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="{{ asset('assets/logojombang.png') }}" />

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&ampdisplay=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">

        <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/tabler-icons.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/fontawesome.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/fonts/flag-icons.css') }}" />

        <!-- Core CSS -->
        <link rel="stylesheet" href="{{ asset('assets/vendor/css/rtl/core.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/css/rtl/theme-default.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/css/demo.css') }}" />

        <!-- Vendors CSS -->
        <link rel="stylesheet" href="{{ asset('assets/vendor/libs/node-waves/node-waves.css') }}" />
        <link rel="stylesheet" href="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css') }}" />

        <!-- Page CSS -->

        <!-- Helpers -->
        <script src="{{ asset('assets/vendor/js/helpers.js') }}"></script>
        <!--! Template customizer & Theme config files MUST be included after core stylesheets and helpers.js in the <head> section -->
        <!--? Config:  Mandatory theme config file contain global vars & default theme options, Set your preferred theme option in this file.  -->

        <script src="{{ asset('assets/vendor/js/template-customizer.js') }}"></script>
        <script src="{{ asset('assets/js/config.js') }}"></script>

        @include('layouts.vuexy-css')
    </head>

    <body>
        <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Navbar -->
            @include('vuexy.navbar')
            <!-- / Navbar -->

            <!-- Layout container -->
            <div class="layout-page">
            <!-- Content wrapper -->
            <div class="content-wrapper">
                <!-- Menu -->
                @include('vuexy.sidebar')
                <!-- / Menu -->

                <!-- Content -->

                <div class="container-xxl flex-grow-1 container-p-y">
                    @yield('content')
                </div>
                <!--/ Content -->

                <!-- Footer -->
                <footer class="content-footer footer bg-footer-theme">
                <div class="container-xxl">
                    <div
                    class="footer-container d-flex align-items-center justify-content-between py-2 flex-md-row flex-column">
                    <div>
                        ©
                        <script>
                        document.write(new Date().getFullYear());
                        </script> <a href="https://www.jombangkab.go.id/" target="_blank" class="footer-link text-primary fw-medium"
                        >Pemerintah Kabupaten Jombang</a
                        >
                    </div>
                    <div class="d-none d-lg-inline-block">
                        <a
                        href="https://jombangkab.go.id/"
                        target="_blank"
                        class="footer-link text-primary fw-medium me-4"
                        ></a
                        >
                    </div>
                    </div>
                </div>
                </footer>
                <!-- / Footer -->

                <div class="content-backdrop fade"></div>
            </div>
            <!--/ Content wrapper -->
            </div>

            <!--/ Layout container -->
        </div>
        </div>

        <!-- Overlay -->
        <div class="layout-overlay layout-menu-toggle"></div>

        <!-- Drag Target Area To SlideIn Menu On Small Screens -->
        <div class="drag-target"></div>

        <!--/ Layout wrapper -->

        <!-- Core JS -->
        <!-- build:js assets/vendor/js/core.js -->

        <script src="{{ asset('assets/vendor/libs/jquery/jquery.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/popper/popper.js') }}"></script>
        <script src="{{ asset('assets/vendor/js/bootstrap.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/node-waves/node-waves.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js') }}"></script>
        <script src="{{ asset('assets/vendor/libs/hammer/hammer.js') }}"></script>

        <script src="{{ asset('assets/vendor/js/menu.js') }}"></script>

        <!-- endbuild -->

        <!-- Vendors JS -->

        <!-- Main JS -->
        <script src="{{ asset('assets/js/main.js') }}"></script>
        @include('layouts.vuexy-scripts')
        @include('sweetalert2::index')
        <script>
            document.addEventListener('DOMContentLoaded', function () {
                document.querySelectorAll('.menu-verifikasi-required').forEach(function (link) {
                    link.addEventListener('click', function (e) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Akses Ditolak',
                            text: 'Akun perusahaan Anda belum diverifikasi oleh Admin Disnaker.',
                            confirmButtonText: 'Mengerti'
                        });
                    });
                });

                document.querySelectorAll('.menu-link:not(.menu-verifikasi-required)').forEach(function (link) {
                    link.addEventListener('click', function (e) {
                        const route = this.getAttribute('data-route');
                        if (route) {
                            window.location.href = route;
                        }
                    });
                });
            });
        </script>

        <!-- Page JS -->
    </body>
</html>
