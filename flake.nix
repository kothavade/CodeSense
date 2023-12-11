{
  inputs.nixpkgs.url = "github:NixOS/nixpkgs/master";
  inputs.systems.url = "github:nix-systems/default";

  outputs = { self, nixpkgs, flake-utils, systems, }:
    flake-utils.lib.eachSystem (import systems) (system:
      let pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default =
          # Need nodejs until https://github.com/oven-sh/bun/issues/6537 is in a release
          pkgs.mkShell {
            buildInputs = with pkgs; [ bun nodejs_18 nodePackages.pnpm ];
          };
      });
}
