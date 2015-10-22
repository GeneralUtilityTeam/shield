/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlet.ajax;

import dao.IntelligenceDAO;
import entity.Area;
import entity.Excerpt;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import utility.ShieldUtility;

/**
 *
 * @author Franco
 */
public class UpdateExcerpt extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet UpdateExcerpt</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet UpdateExcerpt at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        ShieldUtility su = new ShieldUtility();
        
        HttpSession session = request.getSession();
        int excerptID = Integer.parseInt(request.getParameter("excerptID"));
        int editorID = (int)session.getAttribute("userID");
        String text = request.getParameter("text");
        String level8 = request.getParameter("level8");
        String level7 = request.getParameter("level7");
        String level6 = request.getParameter("level6");
        String level5 = request.getParameter("level5");
        String level4 = request.getParameter("level4");
        String level3 = request.getParameter("level3");
        String level2 = request.getParameter("level2");
        String level1 = request.getParameter("level1");
        String latStr = request.getParameter("lat");
        String lngStr = request.getParameter("lng");
        String tagListStr = request.getParameter("tagList");
        ArrayList tagList = su.jsKeywordStringToList(tagListStr);
        
        Excerpt excr = new Excerpt();
        Area area = new Area();
        
        excr.setId(excerptID);
        excr.setText(text);
        area.setLevel8(level8);
        area.setLevel7(level7);
        area.setLevel6(level6);
        area.setLevel5(level5);
        area.setLevel4(level4);
        area.setLevel3(level3);
        area.setLevel2(level2);
        area.setLevel1(level1);
        area.setLat(Double.parseDouble(latStr));
        area.setLng(Double.parseDouble(lngStr));
        excr.setArea(area);
        excr.setTagList(tagList);
        
        IntelligenceDAO intlDAO = new IntelligenceDAO();
        String message = "An error occured";
        try{
            intlDAO.UpdateExcerpt(editorID, excr);
            message = "<strong>Excerpt</strong> has been <strong>updated.</strong>";
        }catch(Exception ex){
            System.out.println(ex);
        }
        
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(message);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
