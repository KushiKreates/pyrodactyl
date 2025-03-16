<!DOCTYPE html>
<!-- Copyright (c) 2023-2024 Pyro Host Inc., parent collaborators, and contributors -->
<html data-pyro-html lang="en" style="background-color: #000000; height: 100%; width: 100%; margin: 0; padding: 0;">
    <head>
        <title>{{ config('app.name', 'Panel') }}</title>

        @section('meta')
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
            <meta name="csrf-token" content="{{ csrf_token() }}">
            <meta name="robots" content="noindex">
            <link rel="icon" type="image/png" href="/favicons/favicon-180x180.png">
            <meta name="theme-color" content="#000000">
        @show

        @section('user-data')
            <script>
                // Create a global SSR props object with all view data
                window.ssr = {
                    props: {
                        // Add standard properties
                        colors: {
                            secondary: "{{ $secondaryColor ?? 'purple-600' }}"
                        },
                        user: @if(!is_null(Auth::user())) {!! json_encode(Auth::user()->toVueObject()) !!} @else null @endif,
                        csrfToken: "{{ csrf_token() }}",
                        baseUrl: "{{ url('/') }}",
                        
                        // Add all variables passed from the controller
                        @foreach(get_defined_vars()['__data'] as $key => $value)
                            @if(!in_array($key, ['__env', 'app', 'errors', 'view', 'siteConfiguration']))
                                @if(is_string($value) || is_numeric($value) || is_bool($value))
                                    {{ $key }}: "{{ $value }}",
                                @elseif(is_array($value) || is_object($value))
                                    {{ $key }}: {!! json_encode($value) !!},
                                @endif
                            @endif
                        @endforeach
                        
                        // Add site configuration
                        siteConfiguration: @if(!empty($siteConfiguration)) {!! json_encode($siteConfiguration) !!} @else {} @endif
                    }
                };
                
                // Maintain backward compatibility
                window.PterodactylUser = window.ssr.props.user;
                window.SiteConfiguration = window.ssr.props.siteConfiguration;
            </script>
        @show

        

        <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap')
        </style>

        @yield('assets')

        @include('layouts.scripts')

        @viteReactRefresh
        @vite('resources/scripts/index.tsx')
    </head>
    <body data-pyro-body class="{{ $css['body'] }}" style="background-color: #000000; height: 100%; width: 100%; margin: 0; padding: 0;">
        @section('content')
            @yield('above-container')
            @yield('container')
            @yield('below-container')
        @show
    </body>
</html>
