desc "export a specefic version"
task :export, [:number] do |task, args|

    version = "v#{args[:number]}"
    readme = ""\
    "```text\n"\
    "This is just an archive repository for a version of my\n"\
    "personal site. Detailed history can be found at main repository.\n"\
    "\n"\
    "Version    : #{args[:number]}\n"\
    "Deployment : https://YoussefRaafatNasry.github.io/#{version}\n"\
    "Latest     : https://YoussefRaafatNasry.github.io/\n"\
    "```\n"

    puts "> Switched to #{version}"
    sh 'git', 'checkout', '-q', version, verbose: false

    puts "> Copying version files to #{version}/"
    sh 'git', 'checkout-index', '-q', "--prefix=#{version}/", '-a', '-f', verbose: false

    puts "> Deleting CNAME from exported files"
    File.delete("#{version}/CNAME")

    puts "> Genereating README"
    file = File.open("#{version}/README.md", "w")
    file.write readme
    file.close

    puts "> Switched back to master"
    sh 'git', 'checkout', '-q', 'master', verbose: false

end 