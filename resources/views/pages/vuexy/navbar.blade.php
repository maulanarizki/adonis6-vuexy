        <nav class="layout-navbar navbar navbar-expand-xl align-items-center bg-navbar-theme" id="layout-navbar">
            <div class="container-xxl">
                <div class="navbar-brand app-brand demo d-none d-xl-flex py-0 me-4">
                    <!-- <a href="{{ route('dashboard') }}" class="app-brand-link gap-2">
                        <span class="app-brand-logo demo">
                            <img src="{{ asset('assets/img/avatars/logo-jombang.png') }}" alt="Logo" width="32" height="32" />
                        </span>
                        <span class="app-brand-text demo menu-text fw-bold">Talenta</span>
                    </a> -->



                    <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto d-xl-none">
                        <i class="ti ti-x ti-sm align-middle"></i>
                    </a>
                    </div>

                    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                    <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                        <i class="ti ti-menu-2 ti-sm"></i>
                    </a>
                    </div>

                    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                    <ul class="navbar-nav flex-row align-items-center ms-auto">
                        <!-- User -->
                        <li class="nav-item navbar-dropdown dropdown-user dropdown">
                        <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);" data-bs-toggle="dropdown">
                            <div class="avatar avatar-online">
                            <img src="{{ asset('assets/img/avatars/16.png') }}" alt class="h-auto rounded-circle" />
                            </div>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                            <a class="dropdown-item" href="#">
                                <div class="d-flex">
                                <div class="flex-shrink-0 me-3">
                                    <div class="avatar avatar-online">
                                    <img src="{{ asset('assets/img/avatars/16.png') }}" alt class="h-auto rounded-circle" />
                                    </div>
                                </div>
                                <div class="flex-grow-1">
                                    <span class="fw-medium d-block">{{ Auth::user()->name }}</span>
                                    <small class="text-muted">{{ Auth::user()->role }}</small>
                                </div>
                                </div>
                            </a>
                            </li>
                            <li>
                            <div class="dropdown-divider"></div>
                            </li>
                            <li>
                            <a class="dropdown-item" href="{{ route('password') }}">
                                <i class="ti ti-settings me-2 ti-sm"></i>
                                <span class="align-middle">Ubah Password</span>
                            </a>
                            </li>
                            <li>
                                <form method="POST" action="{{ route('logout') }}">
                                    @csrf
                                    <button type="submit" class="dropdown-item">
                                        <i class="ti ti-logout me-2 ti-sm"></i>
                                        <span class="align-middle">Log Out</span>
                                    </button>
                                </form>
                            </li>
                        </ul>
                        </li>
                        <!--/ User -->
                    </ul>
                </div>
            </div>
        </nav>
