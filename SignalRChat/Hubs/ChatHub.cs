using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    // The Hub class manages connections, groups, and messaging.
    public class ChatHub : Hub
    {
        // This SendMessage() method can be called by a connected client to send a message to all clients.
        public async Task SendMessage(string userName, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", userName, message);
        }
    }
}