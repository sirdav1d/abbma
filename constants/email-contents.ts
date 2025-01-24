/** @format */

export function generateContentWelcome({ name }: { name: string }) {
	return `<html>
				<body>
					<p>Olá ${name},</p>
					<p>Nosso compromisso é proporcionar aos associados e dependentes, acesso a uma ampla gama de benefícios, através de parcerias privadas, que visam facilitar o bem-estar, educação e saúde, além de oferecer vantagens financeiras, através de descontos e gratuidades.</p><br/>
					<a target="_blank" href="https://www.youtube.com/watch?v=GH0xvi_SiHo">Veja Nosso vídeo e saiba usar seus benefícios</a>
					<br/>	<br/>
					<p>Se você não solicitou essa assinatura, por favor, ignore este e-mail.</p>
				</body>
			</html>`;
}

export function generateContenNewUser({ name }: { name: string }) {
	return `<html>
        <body>
          <p>Novo usuário cadastrado -  ${name},</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
          <br/>
                
        </body>
      </html>`;
}

export function generateContentDeleteUser({ name }: { name: string }) {
	return `<html>
        <body>
          <p>Novo usuário deletado -  ${name},</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
          <br/>
                
        </body>
      </html>`;
}

export function generateContentUpdateUser({ name }: { name: string }) {
	return `<html>
        <body>
          <p>Usuário Atualizado -  ${name},</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
          <br/>
                
        </body>
      </html>`;
}

export function generateContentUpdates({
	message,
	name,
}: {
	name: string;
	message: string;
}) {
	return `<html>
        <body>
          <p>Nova tarefa de -  ${name},</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
            <br/>
          <p>${message}</p>        
        </body>
      </html>`;
}

export function generateContentNewDependent({ name }: { name: string }) {
	return `<html>
        <body>
          <p>Usuário -  ${name}, cadastrou um novo dependente</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
            <br/>
               
        </body>
      </html>`;
}

export function generateContentDeleteDependent({ name }: { name: string }) {
	return `<html>
        <body>
          <p>Usuário -  ${name}, deletou um dependente</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
            <br/>
               
        </body>
      </html>`;
}

export function generateContentUpdateDependent({ name }: { name: string }) {
	return `<html>
        <body>
          <p>Usuário -  ${name}, atualizou os dados de um dependente</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
            <br/>
               
        </body>
      </html>`;
}

export function generateContentNewTicket({
	message,
	name,
}: {
	name: string;
	message: string;
}) {
	return `<html>
        <body>
          <p>Usuário ${name} solicitou novo plano</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
            <br/>
             <p>${message}</p>  
        </body>
      </html>`;
}

export function generateContentDeleteTicket({
	message,
	name,
	ticketName,
}: {
	name: string;
	message: string;
	ticketName: string;
}) {
	return `<html>
        <body>
          <p>Usuário ${name} cancelou o plano ${ticketName}</p>
          </br>
          <p>Vá até o quadro de tarefas na plataforma e faça as ações necessárias</p>
            <br/>
             <p>${message}</p>  
        </body>
      </html>`;
}
