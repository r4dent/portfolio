const CV_DATA = {
    personal: {
        name: '[YOUR NAME]',
        title: 'IT Support Specialist',
        email: '[your-email@domain.com]',
        github: 'github.com/r4dent',
        location: '[YOUR LOCATION]'
    },

    summary: `Career changer seeking first IT role. Completed 2-year accelerated IT program (3-year curriculum) in 2 years while working part-time. Recent 8-week internship at an IT security company focused on automation and DevOps tooling. Long-term goal is cybersecurity.`,

    experience: [
        {
            title: 'Warehouse Associate',
            company: '[PREVIOUS EMPLOYER]',
            period: '2015 - 2023',
            highlights: [
                'Distribution and logistics operations',
                'inventory management',
                'Physical security and access control'
            ]
        },
        {
            title: 'IT Intern',
            company: 'Weak IT',
            period: '2023 (8 weeks)',
            highlights: [
                'Created PowerShell onboarding automation with Active Directory integration',
                'Built JSON-based group management system for teams (hunting, defense, offense)',
                'Integrated with Delinea Secret Server for credential management',
                'Updated company homepage using Ruby and Jekyll (removed external dependencies)',
                'Worked with Confluence and Git workflows'
            ]
        }
    ],

    education: [
        {
            title: 'IT Education (Accelerated 2-Year Program)',
            institution: '[SCHOOL NAME]',
            period: '2022 - 2023',
            note: 'Completed 3-year program in 2 years (full-time, internship Fri)',
            highlights: [
                'Hardware fundamentals',
                'Operating systems (Windows, Linux)',
                'Networking protocols (TCP/IP, DNS, DHCP)',
                'Programming basics',
                'Database fundamentals',
                'IT security basics'
            ]
        }
    ],

    certifications: [
        {
            name: 'Cisco CCNA',
            year: '2023',
            issuer: 'Cisco',
            topics: 'Network Fundamentals, Routing & Switching, Network Security, Automation & Programmability'
        }
    ],

    skills: {
        languages: ['JavaScript', 'Python', 'Bash', 'PowerShell', 'Ruby'],
        web: ['HTML', 'CSS', 'SQL', 'JSON', 'XML'],
        networking: ['Cisco IOS', 'TCP/IP', 'DNS', 'DHCP', 'VLANs'],
        platforms: ['Git', 'Linux', 'Windows Server', 'Jekyll'],
        utilities: ['Subnetting', 'Packet analysis', 'Network diagnostics', 'SSL/TLS', 'Log analysis', 'Active Directory']
    },

    projects: [
        {
            name: 'IT Tools Collection',
            description: 'Client-side JavaScript utility tools including subnet calculator, IP locator, DNS lookup, password generator, and more',
            tech: 'JavaScript, HTML, CSS',
            url: 'r4dent.github.io'
        },
        {
            name: 'Onboarding Automation (Internship)',
            description: 'PowerShell script with Active Directory integration for new employee provisioning',
            tech: 'PowerShell, Active Directory, JSON, Delinea Secret Server',
            status: 'Deployed in production'
        },
        {
            name: 'Phone Mount Repair (CAD)',
            description: 'Custom replacement part for broken tracking camera mount with swivel functionality',
            tech: 'FreeCAD 1.1, PLA 3D printing',
            status: 'Completed'
        }
    ],

    privacyNote: 'No social media profiles maintained for security reasons. Contact directly for more information.'
};

const CV_COMMANDS = {
    cv(args) {
        if (!args || args.length === 0) {
            terminal.print('CV Commands:', 'section');
            terminal.print('  cv summary     View professional summary', 'command');
            terminal.print('  cv exp         View work experience', 'command');
            terminal.print('  cv edu         View education', 'command');
            terminal.print('  cv certs       View certifications', 'command');
            terminal.print('  cv skills      View technical skills', 'command');
            terminal.print('  cv projects   View projects', 'command');
            terminal.print('  cv export     Download as PDF', 'command');
            terminal.print('');
            terminal.print('Use cv [section] to view specific sections', 'dim');
            return;
        }

        const subcommand = args[0].toLowerCase();

        switch(subcommand) {
            case 'summary':
                terminal.print('Professional Summary:', 'section');
                terminal.print(CV_DATA.personal.name, 'highlight');
                terminal.print(CV_DATA.personal.title, 'dim');
                terminal.print('');
                terminal.print(CV_DATA.summary, 'text');
                terminal.print('');
                terminal.print('Contact: ' + CV_DATA.personal.email + ' | ' + CV_DATA.personal.github, 'dim');
                break;

            case 'exp':
            case 'experience':
                terminal.print('Work Experience:', 'section');
                CV_DATA.experience.forEach(job => {
                    terminal.print('');
                    terminal.print(job.title, 'highlight');
                    terminal.print(job.company + ' | ' + job.period, 'dim');
                    job.highlights.forEach(h => {
                        terminal.print('  • ' + h, 'text');
                    });
                });
                break;

            case 'edu':
            case 'education':
                terminal.print('Education:', 'section');
                CV_DATA.education.forEach(edu => {
                    terminal.print('');
                    terminal.print(edu.title, 'highlight');
                    terminal.print(edu.institution + ' | ' + edu.period, 'dim');
                    terminal.print(edu.note, 'dim');
                    terminal.print('');
                    edu.highlights.forEach(h => {
                        terminal.print('  • ' + h, 'text');
                    });
                });
                break;

            case 'certs':
            case 'certifications':
                terminal.print('Certifications:', 'section');
                CV_DATA.certifications.forEach(cert => {
                    terminal.print('');
                    terminal.print(cert.name, 'highlight');
                    terminal.print(cert.year + ' | ' + cert.issuer, 'dim');
                    terminal.print('Topics: ' + cert.topics, 'text');
                });
                break;

            case 'skills':
                terminal.print('Technical Skills:', 'section');
                terminal.print('');
                terminal.print('Languages & Scripting:', 'highlight');
                terminal.print('  ' + CV_DATA.skills.languages.join(', '), 'text');
                terminal.print('');
                terminal.print('Web & Data:', 'highlight');
                terminal.print('  ' + CV_DATA.skills.web.join(', '), 'text');
                terminal.print('');
                terminal.print('Networking:', 'highlight');
                terminal.print('  ' + CV_DATA.skills.networking.join(', '), 'text');
                terminal.print('');
                terminal.print('Platforms:', 'highlight');
                terminal.print('  ' + CV_DATA.skills.platforms.join(', '), 'text');
                terminal.print('');
                terminal.print('Utilities:', 'highlight');
                terminal.print('  ' + CV_DATA.skills.utilities.join(', '), 'text');
                break;

            case 'projects':
                terminal.print('Projects:', 'section');
                CV_DATA.projects.forEach(proj => {
                    terminal.print('');
                    terminal.print(proj.name, 'highlight');
                    terminal.print(proj.description, 'text');
                    terminal.print('Tech: ' + proj.tech, 'dim');
                    if (proj.url) terminal.print('URL: ' + proj.url, 'dim');
                    if (proj.status) terminal.print('Status: ' + proj.status, 'dim');
                });
                break;

            case 'export':
                terminal.print('CV Export:', 'section');
                terminal.print('PDF export not yet available.', 'warning');
                terminal.print('');
                terminal.print('Current CV data is stored in cv-data.js', 'dim');
                terminal.print('Update the data and regenerate the PDF.', 'dim');
                terminal.print('');
                terminal.print('Note: ' + CV_DATA.privacyNote, 'dim');
                break;

            default:
                terminal.print('Unknown cv command: ' + subcommand, 'error');
                terminal.print('Use cv to see available commands', 'dim');
        }
    }
};

Object.assign(window.commands, CV_COMMANDS);