const documentChunks = [
  // --- ICL Overview ---
  {
    "id": "icl_overview_1",
    "text": "Infrastructure Composition Language (ICL) Overview. Spheron Network uses a declarative system for resource allocation via a 'manifest' file called `deploy.yaml` (or `.yml`), written in ICL, which follows the YAML standard similar to Docker Compose.",
    "metadata": { "source": "ICL - Overview" }
  },
  {
    "id": "icl_overview_2",
    "text": "The `deploy.yaml` file requests network resources, structured into sections: Network Configuration, Version, Services, Profiles, Deployment, GPU Support, Private Container Registry Integration, Port Range, Pull Policy, Shared Memory (SHM) Support, Advanced Placement Attributes. Example: version: \"1.0\" services: app: image: node:18",
    "metadata": { "source": "ICL - Overview - Sections" }
  },
  // --- ICL Section 1: Network Configuration ---
  {
    "id": "icl_sec1_network",
    "text": "ICL Section 1: Network Configuration. Defines networking settings for deployment, determining workload connectivity and external access. By default, workloads are isolated; adjust with `expose` to allow connections.",
    "metadata": { "source": "ICL - 1. Network Configuration" }
  },
  // --- ICL Section 2: Version Configuration ---
  {
    "id": "icl_sec2_version",
    "text": "ICL Section 2: Version Configuration. Requires `version: \"1.0\"` as the only accepted value. Example: version: \"1.0\"",
    "metadata": { "source": "ICL - 2. Version Configuration" }
  },
  // --- ICL Section 3: Services Configuration ---
  {
    "id": "icl_sec3_services_overview",
    "text": "ICL Section 3: Services Configuration. Top-level `services` is a map; each key is a unique service name, value is a map of configuration fields.",
    "metadata": { "source": "ICL - 3. Services Configuration - Overview" }
  },
  {
    "id": "icl_sec3_services_fields",
    "text": "Services Fields: `image` (Yes, Docker image, avoid :latest), `command` (No), `args` (No), `env` (No), `expose` (No), `pull_policy` (No), `credentials` (No), `params` (No). Example: services: app: image: node:18",
    "metadata": { "source": "ICL - 3. Services Configuration - Fields" }
  },
  {
    "id": "icl_sec3_services_env",
    "text": "Services: Environment Variables. `env` is a list of key-value pairs. Example: env: - WALLET_ADDR=0xabcdedghijke - VERSION=1.0",
    "metadata": { "source": "ICL - 3. Services Configuration - Environment Variables" }
  },
  {
    "id": "icl_sec3_services_expose_notes",
    "text": "Services: Port Exposure Notes. HTTPS uses self-signed certs; use third-party (e.g., Cloudflare) for signed certs. Map ports with `as: 80` if app handles HTTP/HTTPS.",
    "metadata": { "source": "ICL - 3. Services Configuration - Port Exposure Notes" }
  },
  {
    "id": "icl_sec3_services_expose_fields",
    "text": "Services: Port Exposure Fields. `expose` list: `port` (Yes), `as` (No, defaults to `port`), `accept` (No), `proto` (No, tcp/udp), `to` (No), `use_public_port` (No).",
    "metadata": { "source": "ICL - 3. Services Configuration - Port Exposure Fields" }
  },
  {
    "id": "icl_sec3_services_expose_proto_defaults",
    "text": "Services: Proto Defaults. `proto` defaults: `as: 80` to 'http & https', others to 'tcp & udp'.",
    "metadata": { "source": "ICL - 3. Services Configuration - Port Exposure Proto Defaults" }
  },
  {
    "id": "icl_sec3_services_expose_example",
    "text": "Services: Port Exposure Example. Expose port 3000 as 80, globally: expose: - port: 3000 as: 80 to: - global: true",
    "metadata": { "source": "ICL - 3. Services Configuration - Port Exposure Example" }
  },
  {
    "id": "icl_sec3_services_expose_to",
    "text": "Services: expose.to. Defines allowed clients with `service` or `global` (default false). Example: to: - global: true",
    "metadata": { "source": "ICL - 3. Services Configuration - Configuring expose.to - Overview" }
  },
  {
    "id": "icl_sec3_services_expose_to_rules",
    "text": "Services: expose.to Rules. `[{ global: true }]` allows all, `[{ service: \"backend\" }]` limits to same datacenter, `[{ service: \"backend\", global: true }]` allows across datacenters. `global: false` requires `service`.",
    "metadata": { "source": "ICL - 3. Services Configuration - Configuring expose.to - Rules" }
  },
  {
    "id": "icl_sec3_services_pull_policy",
    "text": "Services: Pull Policy. Values: `Always` (recommended for :latest), `IfNotPresent`, `Never`. Example: pull_policy: Always",
    "metadata": { "source": "ICL - 3. Services Configuration - Pull Policy" }
  },
  // --- ICL Section 4: Profiles ---
  {
    "id": "icl_sec4_profiles_overview",
    "text": "ICL Section 4: Profiles. Defines `name` (No), `mode` (Yes), `duration` (Yes), `tiers` (No), `compute` (Yes), `placement` (Yes).",
    "metadata": { "source": "ICL - 4. Profiles - Overview" }
  },
  {
    "id": "icl_sec4_profiles_mode",
    "text": "Profiles: Mode. `mode`: `provider` (stable) or `fizz` (lower cost). Example: mode: provider",
    "metadata": { "source": "ICL - 4. Profiles - Deployment Mode" }
  },
  {
    "id": "icl_sec4_profiles_duration",
    "text": "Profiles: Duration. `duration`: s, min, h, d, mon, y. Locks funds. Example: duration: 24h",
    "metadata": { "source": "ICL - 4. Profiles - Lease Duration" }
  },
  {
    "id": "icl_sec4_profiles_tiers",
    "text": "Profiles: Tiers. `tiers`: `secured` (1-3), `community` (4-7), or specific (e.g., `secured-1`). Example: tiers: - secured",
    "metadata": { "source": "ICL - 4. Profiles - Deployment Tier" }
  },
  {
    "id": "icl_sec4_profiles_compute_overview",
    "text": "Profiles: Compute. `profiles.compute` maps profile names (e.g., `api`) to resources.",
    "metadata": { "source": "ICL - 4. Profiles - Compute Profiles - Overview" }
  },
  {
    "id": "icl_sec4_profiles_compute_resources",
    "text": "Profiles: Compute Resources. `resources`: `cpu`, `memory`, `storage` (list), `gpu`. Example: compute: api: resources: cpu: { units: 2 } memory: { size: \"4Gi\" }",
    "metadata": { "source": "ICL - 4. Profiles - Compute Profiles - Resources" }
  },
  {
    "id": "icl_sec4_profiles_compute_cpu",
    "text": "Profiles: CPU Units. `cpu.units`: Integer (1), fraction (0.5), or milli-CPU (\"100m\").",
    "metadata": { "source": "ICL - 4. Profiles - Compute Profiles - CPU Units" }
  },
  {
    "id": "icl_sec4_profiles_compute_memory_storage",
    "text": "Profiles: Memory/Storage. `memory.size`, `storage[].size`: Use k, Ki, M, Mi, G, Gi, etc. Example: \"4Gi\"",
    "metadata": { "source": "ICL - 4. Profiles - Compute Profiles - Memory/Storage Units" }
  },
  {
    "id": "icl_sec4_profiles_placement_overview",
    "text": "Profiles: Placement. `profiles.placement` maps names (e.g., `us-east`) to attributes and pricing.",
    "metadata": { "source": "ICL - 4. Profiles - Placement Profiles - Overview" }
  },
  {
    "id": "icl_sec4_profiles_placement_example",
    "text": "Profiles: Placement Example. placement: useast: attributes: region: us-east pricing: web: token: USDT amount: 80",
    "metadata": { "source": "ICL - 4. Profiles - Placement Profiles - Example" }
  },
  {
    "id": "icl_sec4_profiles_placement_attributes",
    "text": "Profiles: Placement Attributes. `attributes`: Includes `region`, see Advanced Placement for more.",
    "metadata": { "source": "ICL - 4. Profiles - Placement Profiles - Attributes" }
  },
  {
    "id": "icl_sec4_profiles_placement_pricing",
    "text": "Profiles: Placement Pricing. `pricing`: Maps compute profiles to `token` and `amount`. Example: pricing: web: token: USDT amount: 80",
    "metadata": { "source": "ICL - 4. Profiles - Placement Profiles - Pricing" }
  },
  // --- ICL Section 5: Deployment Configuration ---
  {
    "id": "icl_sec5_deployment_overview",
    "text": "ICL Section 5: Deployment. `deployment` maps service names to placement profiles.",
    "metadata": { "source": "ICL - 5. Deployment Configuration - Overview" }
  },
  {
    "id": "icl_sec5_deployment_structure",
    "text": "Deployment Structure. `deployment.<service>.<placement>`: Specifies `profile` and `count`.",
    "metadata": { "source": "ICL - 5. Deployment Configuration - Structure" }
  },
  {
    "id": "icl_sec5_deployment_example",
    "text": "Deployment Example. deployment: api: useast: profile: api count: 30",
    "metadata": { "source": "ICL - 5. Deployment Configuration - Example" }
  },
  // --- ICL Section 6: GPU Integration ---
  {
    "id": "icl_sec6_gpu_overview",
    "text": "ICL Section 6: GPU. Add under `resources.gpu`: `units` and `attributes` (vendor, model, ram, interface).",
    "metadata": { "source": "ICL - 6. GPU Integration - Overview" }
  },
  {
    "id": "icl_sec6_gpu_example",
    "text": "GPU Example. profiles: compute: gpudep: resources: gpu: units: 1 attributes: vendor: nvidia: - model: a100",
    "metadata": { "source": "ICL - 6. GPU Integration - Basic Example" }
  },
  {
    "id": "icl_sec6_gpu_optional_model",
    "text": "GPU: Optional Model. Omit `model` or use empty list for any NVIDIA GPU. Example: gpu: attributes: vendor: nvidia: []",
    "metadata": { "source": "ICL - 6. GPU Integration - Optional Model" }
  },
  {
    "id": "icl_sec6_gpu_multiple_models",
    "text": "GPU: Multiple Models. List models for flexibility. Example: gpu: attributes: vendor: nvidia: - model: rtx4090 - model: t4",
    "metadata": { "source": "ICL - 6. GPU Integration - Multiple Models" }
  },
  {
    "id": "icl_sec6_gpu_specify_ram",
    "text": "GPU: RAM. Add `ram` with suffix (e.g., 80Gi). Example: nvidia: - model: a100 ram: 80Gi",
    "metadata": { "source": "ICL - 6. GPU Integration - Specifying RAM" }
  },
  {
    "id": "icl_sec6_gpu_specify_interface",
    "text": "GPU: Interface. Use `pcie` or `sxm`. Example: nvidia: - model: h100 interface: sxm",
    "metadata": { "source": "ICL - 6. GPU Integration - Specifying Interface" }
  },
  {
    "id": "icl_sec6_gpu_specify_ram_interface",
    "text": "GPU: RAM and Interface. Combine in one object. Example: nvidia: - model: h100 interface: pcie ram: 90Gi",
    "metadata": { "source": "ICL - 6. GPU Integration - Specifying RAM and Interface" }
  },
  // --- ICL Section 7: Private Registry ---
  {
    "id": "icl_sec7_private_registry",
    "text": "ICL Section 7: Private Registry. Use `credentials` under `services` with `registry`, `username`, `password`. Example: credentials: registry: ghcr.io username: myuser password: \"mypat\"",
    "metadata": { "source": "ICL - 7. Private Registry Integration" }
  },
  {
    "id": "icl_sec7_private_registry_notes",
    "text": "Private Registry Notes. Use `docker.io` (password), `ghcr.io` (PAT), tested with Docker Hub/GHCR.",
    "metadata": { "source": "ICL - 7. Private Registry Integration - Notes" }
  },
  // --- ICL Section 8: Port Range (Fizz Only) ---
  {
    "id": "icl_sec8_port_range",
    "text": "ICL Section 8: Port Range. For `fizz` mode only. Use `port_range` and `port_range_as` (e.g., 8443-8445), ports 80/443 unavailable. Example: expose: - port_range: 8443-8445 port_range_as: 8443-8445 to: - global: true",
    "metadata": { "source": "ICL - 8. Port Range (Fizz Only)" }
  },
  // --- ICL Section 10: Shared Memory (SHM) ---
  {
    "id": "icl_sec10_shm_overview",
    "text": "ICL Section 10: SHM Support. For IPC or temp storage. Configured in compute profiles, mounted in services.",
    "metadata": { "source": "ICL - 10. SHM Support - Overview" }
  },
  {
    "id": "icl_sec10_shm_compute",
    "text": "SHM in Compute: Add `storage` entry with `class: ram`, `persistent: false`. Example: storage: - name: shared-mem size: 2Gi attributes: { class: ram, persistent: false }",
    "metadata": { "source": "ICL - 10. SHM Support - Compute Profiles" }
  },
  {
    "id": "icl_sec10_shm_services",
    "text": "SHM in Services: Mount with `params.storage`. Example: params: storage: shared-mem: mount: /dev/shm",
    "metadata": { "source": "ICL - 10. SHM Support - Services Mount" }
  },
  // --- ICL Section 11: Advanced Placement ---
  {
    "id": "icl_sec11_adv_placement_overview",
    "text": "ICL Section 11: Advanced Placement. Use `attributes` under `placement` with `region`, `desired_provider`, `desired_fizz`.",
    "metadata": { "source": "ICL - 11. Advanced Placement - Overview" }
  },
  {
    "id": "icl_sec11_adv_placement_region",
    "text": "Advanced Placement: Region. Set `region` to a supported code (e.g., us-east).",
    "metadata": { "source": "ICL - 11. Advanced Placement - Region" }
  },
  {
    "id": "icl_sec11_adv_placement_provider",
    "text": "Advanced Placement: Provider. Use `desired_provider` with blockchain address.",
    "metadata": { "source": "ICL - 11. Advanced Placement - Provider" }
  },
  {
    "id": "icl_sec11_adv_placement_fizz",
    "text": "Advanced Placement: Fizz. Use `desired_fizz` for `fizz` mode.",
    "metadata": { "source": "ICL - 11. Advanced Placement - Fizz Node" }
  },
  {
    "id": "icl_sec11_adv_placement_combining",
    "text": "Advanced Placement: Combining. Use multiple attributes, ensure mode compatibility.",
    "metadata": { "source": "ICL - 11. Advanced Placement - Combining" }
  },
  // --- Supported Configurations ---
  {
    "id": "supp_config_gpu_table_intro",
    "text": "Supported Configurations: GPU Support. Maps full GPU names to ICL short names.",
    "metadata": { "source": "Supported Configurations - GPU Support Intro" }
  },
  {
    "id": "supp_config_gpu_table_chunk_1",
    "text": "GPU Support: NVIDIA T1000: t1000, Tesla P4: p4, GTX 1050: gtx1050, GTX 1050 Ti: gtx1050ti, GTX 1060: gtx1060.",
    "metadata": { "source": "Supported Configurations - GPU Support - GTX 10 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_2",
    "text": "GPU Support: GTX 1070: gtx1070, GTX 1070 Ti: gtx1070ti, GTX 1080: gtx1080, GTX 1080 Ti: gtx1080ti.",
    "metadata": { "source": "Supported Configurations - GPU Support - GTX 10 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_3",
    "text": "GPU Support: GTX 1650: gtx1650, GTX 1650 Ti: gtx1650ti, GTX 1660: gtx1660, GTX 1660 Ti: gtx1660ti, GTX 1660 Super: gtx1660super.",
    "metadata": { "source": "Supported Configurations - GPU Support - GTX 16 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_4",
    "text": "GPU Support: RTX 2050: rtx2050, RTX 2060: rtx2060, RTX 2060 Super: rtx2060super, RTX 2070: rtx2070, RTX 2080: rtx2080.",
    "metadata": { "source": "Supported Configurations - GPU Support - RTX 20 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_5",
    "text": "GPU Support: RTX 2080 Super: rtx2080super, RTX 2080 Ti: rtx2080ti, RTX 3050: rtx3050, RTX 3060: rtx3060, RTX 3060 Ti: rtx3060ti.",
    "metadata": { "source": "Supported Configurations - GPU Support - RTX 20/30 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_6",
    "text": "GPU Support: RTX 3070: rtx3070, RTX 3070 Ti: rtx3070ti, RTX 3080: rtx3080, RTX 3080 Ti: rtx3080ti, RTX 3090: rtx3090.",
    "metadata": { "source": "Supported Configurations - GPU Support - RTX 30 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_7",
    "text": "GPU Support: RTX 3090 Ti: rtx3090ti, RTX 4050: rtx4050, RTX 4060: rtx4060, RTX 4060 Ti: rtx4060ti, RTX 4070: rtx4070.",
    "metadata": { "source": "Supported Configurations - GPU Support - RTX 30/40 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_8",
    "text": "GPU Support: RTX 4070 Ti: rtx4070ti, RTX 4070 Ti Super: rtx4070tisuper, RTX 4080: rtx4080, RTX 4090: rtx4090, RTX 4000: rtx4000.",
    "metadata": { "source": "Supported Configurations - GPU Support - RTX 40 Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_9",
    "text": "GPU Support: RTX 4000 Ada: rtx4000-ada, RTX A4000: rtxa4000, RTX A5000: rtxa5000, RTX A6000: rtxa6000, RTX 8000: rtx8000.",
    "metadata": { "source": "Supported Configurations - GPU Support - RTX Pro Series" }
  },
  {
    "id": "supp_config_gpu_table_chunk_10",
    "text": "GPU Support: RTX 6000 Ada: rtx6000-ada, Tesla P100 PCIe: p100, P40: p40, Tesla T4: t4, Titan RTX: titanrtx.",
    "metadata": { "source": "Supported Configurations - GPU Support - Datacenter Older Gen" }
  },
  {
    "id": "supp_config_gpu_table_chunk_11",
    "text": "GPU Support: A10: a10, A10G: a10g, L4: l4, Tesla V100: v100, A40: a40, L40: l40, L40s: l40s, A100 PCIE 40GB: a100-pcie-40g.",
    "metadata": { "source": "Supported Configurations - GPU Support - Datacenter Older Gen" }
  },
  {
    "id": "supp_config_gpu_table_chunk_12",
    "text": "GPU Support: A100 SXM4 40GB: a100-sxm-40g, A100 80GB: a100-80g, H100 80G: h100.",
    "metadata": { "source": "Supported Configurations - GPU Support - Datacenter High End" }
  },
  {
    "id": "supp_config_cpu_table",
    "text": "Supported Configurations: CPU. Maps CPU Type: General Purpose to Short Name: gp.",
    "metadata": { "source": "Supported Configurations - CPU Support" }
  },
  {
    "id": "supp_config_token_table",
    "text": "Supported Configurations: Payment Tokens. Valid `pricing.token` values: USDT (6, 15), USDC (6, 15), DAI (18, 15), WETH (18, 0.005), CST (6, 15). Precision is decimals, Min Deposit in units.",
    "metadata": { "source": "Supported Configurations - Payment Tokens" }
  },
  {
    "id": "supp_config_region_table",
    "text": "Supported Configurations: Regions. Valid `attributes.region` codes include: us-east, us-west, us-central, uk, germany, france, canada, australia, india, japan, singapore, brazil, mexico.",
    "metadata": { "source": "Supported Configurations - Regions" }
  },
  // --- Fizz vs Provider Mode ICL Differences ---
  {
    "id": "mode_diff_network",
    "text": "Fizz vs Provider: Networking. Fizz: no 80/443, uses `port_range`, `use_public_port`. Provider: supports 80/443, load balancing with `count` > 1.",
    "metadata": { "source": "Fizz vs Provider Mode Guide - Networking Differences" }
  },
  {
    "id": "mode_diff_resources",
    "text": "Fizz vs Provider: Resources. Fizz: lower limits, 1 GPU max, no SHM, no runtime updates. Provider: higher limits, GPUs, SHM, runtime updates, `count` > 1.",
    "metadata": { "source": "Fizz vs Provider Mode Guide - Resource Differences" }
  }
];