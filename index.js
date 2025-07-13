import 'dotenv/config';
import readline from 'readline';
import makeWASocket, {
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Masukkan nomor WhatsApp (cth: 62812xxxx): ', async (number) => {
  console.log(`\n📲 Menyiapkan pairing untuk nomor: ${number}`);

  const { state, saveCreds } = await useMultiFileAuthState(`./auth/${number}`);
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: false,
    getMessage: async () => ({ conversation: 'RonzAI aktif' })
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', ({ connection, pairingCode }) => {
    if (pairingCode) {
      console.log(`\n🔐 Pairing Code untuk nomor ${number}:\n➡️  ${pairingCode}`);
      console.log('📲 Buka WhatsApp > Tautkan Perangkat > Masukkan kode di atas.\n');
    }

    if (connection === 'open') {
      console.log(`\n✅ Bot berhasil masuk ke nomor: ${number}`);
      rl.close();
    }

    if (connection === 'close') {
      console.log(`\n❌ Koneksi ditutup. Silakan coba ulang.`);
      rl.close();
    }
  });
});
